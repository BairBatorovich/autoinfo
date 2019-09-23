import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, ScrollView, RefreshControl } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { SQLite } from 'expo-sqlite';

import styles from '../../styles';
import News from '../../components/news'

import { NewsAdd, NewsIdAdd } from '../../store/action/newsAction';
import { myRouteAdd } from '../../store/action/profileAction';

const db = SQLite.openDatabase("db.db");

class NewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            page: 1,
            refreshing: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Новости',

            headerLeft: <Icon
                name="bars"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />,

        };
    };

    //загрузка новостей
    downloadnews = async () => {
        let tok = await this._retrieveData();
        try {
            const response = await axios.get(`/v1/news/index?access-token=${tok}&page=1`);
            this.props.NewsAdd(response.data);
            this.setState({ news: this.props.news, refreshing: false });
        } catch (error) {
            console.log(error);
        }
    }
    //загрузка старых новостей при нижнем положении скрола 
    pushnews = async () => {
        console.log('swipe');
        let tok = await this._retrieveData();
        await this.setState({ page: ++this.state.page });
        try {
            const response = await axios.get(`/v1/news/index?access-token=${tok}&page=${this.state.page}`);

            if (response.data[response.data.length - 1].id == 1) {
                console.log('все новости загружены');

            } else {
                this.setState({ news: [...this.state.news, ...response.data] });
                this.props.NewsAdd(this.state.news);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //получение токена из AsyncStorage
    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('@token');
            if (token !== null) {
                return token;
            }
        } catch (error) {
            // Error retrieving data
            console.log('error');
        }
    };

    //обновление новостей свайпом вниз
    update = () => {
        this.setState({ refreshing: true, page: 1 });
        this.downloadnews();
    }

    componentWillMount = () => {
        this.downloadnews(this.state.page);
    }

    //Создается таблица в БД если её нет
    componentDidMount = async () => {
        try {
            const myRoute = await axios.post(`/v1/route/index?access-token=${this.props.token}`);
            this.props.myRouteAdd(myRoute.data)
        } catch (error) {
            console.log(error);
        }
        db.transaction(
            tx => {
                tx.executeSql(
                    `create table if not exists station (id integer primary key autoincrement not null, stationId int not null, 
                        latitude float, longitude float, radius float, name text, soundLink text );`);
                tx.executeSql(
                    `create table if not exists loaded (id integer primary key not null, load int);`); //Здесь хранится статус загрузки озвучки маршрута
            },
            error => { console.log(error) }
        );
    }
    render() {
        const { news } = this.state;

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.update}
                        progressBackgroundColor='#58ACFA'
                    />
                }
                onMomentumScrollEnd={this.pushnews}
            >
                <View style={styles.newsScroll}>
                    {news.map(news => <News
                        key={news.id}
                        id={news.id}
                        title={news.title}
                        date={news.dateView}
                        navigation={this.props.navigation}
                    />)}
                </View>
            </ScrollView>

        )
    }
};

const mapStateToProps = (state) => {
    return {
        news: state.newsReducer.news,
        token: state.logReducer.token,
    }
}
const mapDispatchToProps = {
    NewsAdd,
    NewsIdAdd,
    myRouteAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);