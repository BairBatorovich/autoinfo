import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../styles';

class NewsDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            title: '',
            description: '',
            content: '',
            date: ''
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Новости',

            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('News')}
            />,

        };
    };
    componentWillMount = async () => {
        const { news, newsId } = this.props;
        for (i = 0; i < news.length; i++) {
            if (news[i].id == newsId) {
                await this.setState({
                    title: news[i].title,
                    description: news[i].description,
                    content: news[i].content,
                    date: news[i].dateView
                })
            }
        }
    }

    render() {
        const { title, description, content, date } = this.state;

        return (
            <ScrollView >
                <View style={styles.newsDetailView}>
                <View style={styles.newsDetail}>

                    <View style={styles.newsDetailtitle}>
                        <Text style={styles.newsDetailtitleText}>{title}</Text>
                        <Text style={styles.newsDetailDate}>{date}</Text>
                    </View>

                    <Text style={styles.newsDetailText}>{description}</Text>
                    <Text style={styles.newsDetailText}>{content}</Text>

                </View>
                </View>
            </ScrollView>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        newsId: state.newsReducer.newsId,
        news: state.newsReducer.news
    }
}

export default connect(mapStateToProps)(NewsDetailScreen);