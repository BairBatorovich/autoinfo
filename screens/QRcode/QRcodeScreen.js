import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import QRCode from 'react-native-qrcode';
import * as SQLite from 'expo-sqlite';

import styles from '../../styles';
import HalfBtn from '../../components/button/HalfBtn';
import { relativeTimeThreshold } from 'moment';

const db = SQLite.openDatabase("db.db");

class QRcodeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            url: '',
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'QR код',
            headerLeft: <Icon
                name="bars"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />,
        };
    };
    savedb = (url) => {
        db.transaction(
            tx => {
                tx.executeSql(
                    `insert into qrcode ( url ) values ( '${url}' )`
                );
            },
            error => console.log(error)
        )
    }
    download = async (x) => {
        if(x.length == 0) {
            try {
                let url = await Axios.get(`/v1/qr/view-data?access-token=${this.props.token}`);
                this.setState({url:url.data});
                this.savedb(url.data)
            } catch (error) {
                this.setState({message:error.response.message});
            }
        } else {
            this.setState({url:x[0].url});
        }
    }
    update = async() => {
        try {
            let url = await Axios.get(`/v1/qr/view-data?access-token=${this.props.token}`);
            this.setState({url:url.data});
            this.savedb(url.data)
        } catch (error) {
            this.setState({message:error.response.message});
        }
    }
    componentDidMount = async () => {
        db.transaction(tx => {
            tx.executeSql(
                `select url from qrcode`,
                [],
                (_, { rows }) => this.download(rows._array));
        }, error => { console.log(error) }
        )
    }

    render() {
        const { message, url } = this.state;
        return (
            <View style={styles.track}>
                {message == null ? <QRCode value={url} size={250} bgColor='black' fgColor='white'/> : <Text>{message}</Text>}
                <HalfBtn name='ОБНОВИТЬ' run={this.update}/>
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
    }
}

export default connect(mapStateToProps)(QRcodeScreen);