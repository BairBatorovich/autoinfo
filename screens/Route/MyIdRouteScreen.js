import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';

import styles from '../../styles';
import { stationsGPSADD } from '../../store/action/profileAction';
import BigBtn from '../../components/button/BigBtn';

const db = SQLite.openDatabase("db.db");

let Stations = {};
let prevStationId = null;
let nextStationId = null;

findStation = (locations) => {
    let lat = locations[locations.length - 1].coords.latitude;
    let lon = locations[locations.length - 1].coords.longitude;
    for (i = 0; i < Stations.stations.length; i++) {
        let radius = Stations.stations[i].radius;
        let latStation = Stations.stations[i].latitude;
        let lonStation = Stations.stations[i].longitude;
        let r = Math.sqrt((lat - latStation) * (lat - latStation) + (lon - lonStation) * (lon - lonStation));
        if (radius > r.toFixed(6)) {
            if (Stations.stations[i].id != prevStationId) {
                this.read(Stations.id, Stations.stations[i].id);
                prevStationId = Stations.stations[i].id;
                setTimeout(() => { next(); }, 5000);
                if (i + 1 <= Stations.stations.length) {
                    nextStationId = Stations.stations[i + 1].id;
                    setTimeout(() => { read(Stations.id, Stations.stations[i + 1].id) }, 6280);
                }
            }
            break;
        }
    }
}
//Озвучка
play = async (x) => {
    Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: {
            INTERRUPTION_MODE_ANDROID_DO_NOT_MIX: true,
            INTERRUPTION_MODE_ANDROID_DUCK_OTHERS: true,
        },
        playThroughEarpieceAndroid: true
    })
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync({ uri: x });
        await soundObject.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}
read = (route, station) => {
    let o = `${route}${station}`;
    db.transaction(tx => {
        tx.executeSql(
            `select soundLink from station where stationId like ${o}`, //прогрывается файл из бд по Номер направления+Айди остановки
            [],
            (_, { rows }) => play(rows._array[0].soundLink));
    }, error => { console.log(error) }
    )
}
next = async () => {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('../../assets/next.wav'));
        await soundObject.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

class MyIdRouteScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.stationsGps.active,
            way: this.props.stationsGps.way,
            number: 0,
            route: {},
            wayStations: {},
        }
    }
    static navigationOptions = ({ navigation }) => {
        let number = '';
        if (navigation.state.params != undefined) {
            number = navigation.state.params.number;
        }
        return {
            title: `Маршрут №${number}`,
            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('MyRoute')} />
        };
    };
    start = async () => {
        const { myWays } = this.props;
        const { way } = this.state;
        this.setState({ active: true });
        if (way) {
            Stations = myWays[1];
        } else {
            Stations = myWays[0];
        }
        let locat = await Location.startLocationUpdatesAsync(
            'Stations',
            {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 0,
            },
        );
        let x = { active: true, way: way };
        this.props.stationsGPSADD(x);
    }
    way = () => {
        const { active, way } = this.state;
        this, this.setState({ way: !way });
        console.log(way)
        let x = { active: active, way: !way };
        this.props.stationsGPSADD(x);
    }
    componentWillMount = async () => {
        const { myRoute, idRoute } = this.props;
        if (myRoute.length > 0) {
            for (i = 0; i < myRoute.length; i++) {
                if (myRoute[i].id == idRoute) {
                    await this.setState({
                        route: myRoute[i],
                    });
                    this.props.navigation.setParams({ number: myRoute[i].number });
                }
            }
        }
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
        this.setState({ active: this.props.stationsGps.active, way: this.props.stationsGps.way })
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
    };
    stop = () => {
        const { active, way } = this.state;
        this.setState({ active: false });
        Location.stopLocationUpdatesAsync('Stations')
        let x = { active: false, way: way };
        this.props.stationsGPSADD(x);
    }
    render() {
        const { active, way, route } = this.state;
        return (
            <View style={styles.track}>
                <Text style={styles.trackStatusText1}>{way ? route.ways[1].name : route.ways[0].name}</Text>
                <BigBtn
                    name1='Остановить'
                    name2='Начать'
                    active={active}
                    stop={this.stop}
                    start={this.start}
                />
                <BigBtn
                name1='Сменить направление'
                name2='Сменить направление'
                active={way}
                stop={this.way}
                start={this.way}
                />
            </View>
        )
    }
};
TaskManager.defineTask('Stations', ({ data: { locations }, error }) => {
    if (error) {
        // check `error.message` for more details.
        return;
    }
    findStation(locations);
});
const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
        myRoute: state.profileReducer.myRoute,
        idRoute: state.profileReducer.idRoute,
        myWays: state.profileReducer.myWays,
        stationsGps: state.profileReducer.stationsGps,
    }
}
const mapDispatchToProps = {
    stationsGPSADD
}
export default connect(mapStateToProps, mapDispatchToProps)(MyIdRouteScreen);