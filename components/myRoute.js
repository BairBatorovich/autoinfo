import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';
import Axios from 'axios';
import * as SQLite from 'expo-sqlite';

import styles from '../styles';
import { idRouteAdd, myWayAdd } from '../store/action/profileAction';
import { URL } from '../constants/index'

const db = SQLite.openDatabase("db.db");

class myRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number,
            id: this.props.id,
            download: false,
            test: []
        };
    }
    //Переход в экран с ВКЛ/ВЫКЛ отслеживания остановок
    openid = async () => {
        const { token, ways } = this.props;
        this.props.idRouteAdd(this.state.id)        
        let way = [];
        for (i = 0; i < ways.length; i++) {
            const x = await Axios.get(`/v1/way/view?access-token=${token}&id=${ways[i].id}`);
            way.push(x.data);
        }
        this.props.myWayAdd(way);
        this.props.open();
    }
    //Загрузка озвучивания названий остановок
    downloadWay = async () => {
        const { token, ways } = this.props;
        for (i = 0; i < ways.length; i++) {
            const x = await Axios.get(`/v1/way/view?access-token=${token}&id=${ways[i].id}`);
            if (x.status == 200) {
                for (j = 0; j < x.data.stations.length; j++) {
                    let stationId = `${ways[i].id}${x.data.stations[j].id}`;
                    let latitude = x.data.stations[j].latitude;
                    let longitude = x.data.stations[j].longitude;
                    let radius = x.data.stations[j].radius;
                    let name = x.data.stations[j].name;

                    FileSystem.downloadAsync(
                        `${URL}${x.data.stations[j].soundLink}?access-token=${token}`,
                        FileSystem.documentDirectory + this.pathname(`${URL}${x.data.stations[j].soundLink}`)
                    ).then(({ uri }) => this.savedb(stationId, latitude, longitude, radius, name, uri))
                        .catch(error => console.log(error))
                }
            }
        }
        this.setState({ download: true });
        db.transaction(
            tx => {
                tx.executeSql(
                    `insert into loaded ( id, load ) values ( ${this.state.id}, 1 )`
                );
            },
            error => console.log(error)
        )
    }
    //Вытаскивает имя файла из ссылки
    pathname = (link) => {
        let x = link.split("/").pop();
        return x;
    }
    //Сохранение информации об остановке uri файла озвучки
    savedb = (stationId, latitude, longitude, radius, name, soundLink) => {
        db.transaction(
            tx => {
                tx.executeSql(
                    `insert into station ( stationId, latitude, longitude, radius, name, soundLink) values ( ${stationId}, ${latitude}, ${longitude}, ${radius}, '${name}','${soundLink}' )`
                );
            },
            error => console.log(error)
        )
    }
    //Проверка статуса загрузки маршрутов
    statusLoaded = (x) => {
        if (x.length > 0) {
            if (x[0].load == 1) {
                this.setState({ download: true });
            }
        }
    }

    componentWillMount = () => {
        db.transaction(tx => {
            tx.executeSql(
                `select load from loaded where id like ${this.state.id}`,
                [],
                (_, { rows }) => this.statusLoaded(rows._array));
        }, error => { console.log(error) }
        )
    }

    render() {
        const { id, idRoute } = this.props;
        const { number, price, download } = this.state;

        return (
            <View style={styles.routeUrbanTouch}>
                {download ? <TouchableOpacity style={styles.routeUrbanBuy} onPress={this.openid}>
                    <Text style={styles.routeTextId}>№ {number}</Text>
                    <Icon name='check' color={'green'} size={26} onPress={this.pressbuy} />
                </TouchableOpacity> : <TouchableOpacity style={styles.routeUrbanBuy} onPress={this.downloadWay}>
                        <Text style={styles.routeTextId}>№ {number}</Text>
                        <Icon name='download' color={'green'} size={26} />
                    </TouchableOpacity>}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
        idRoute: state.profileReducer.idRoute,
    }
}
const mapDispatchToProps = {
    idRouteAdd,
    myWayAdd
}
export default connect(mapStateToProps, mapDispatchToProps)(myRoute);