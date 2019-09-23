import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import moment from 'moment';
import axios from 'axios';

import styles from '../../styles';

let token = null;

sendLocation = async (locations) => {
    let time = moment(locations[locations.length-1].timestamp).format('YYYY-MM-DD HH:mm:ss');
    // console.log(locations[locations.length-1].coords.latitude);
    // console.log(locations[locations.length-1].coords.longitude);
    // console.log(locations[locations.length-1].coords.longitude);
    // console.log(time);
    // console.log(locations[locations.length-1].coords.altitude);
    // console.log(locations[locations.length-1].coords.speed);
    const send = await axios.post(`/v1/tracker/insert?access-token=${token}`, {
        lat: locations[locations.length-1].coords.latitude,
        lon: locations[locations.length-1].coords.longitude,
        time: time,
        alt: locations[locations.length-1].coords.altitude,
        dir: 0,
        speed: locations[locations.length-1].coords.speed,
    }).then(response => console.log(response.data))
        .catch(error => console.log(error.response.data))
}

class TrackingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            tarif: 27,
            location: null,
            errorMessage: null,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Трекер',
            headerLeft: <Icon
                name="bars"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />,
        };
    };
    //Переход в экран логов
    log = () => {
        this.props.navigation.navigate('TrackLog');
    }
    componentWillMount() {
        token = this.props.token;
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };
    start = async () => {
        this.setState({ active: !this.state.active })
        let locat = await Location.startLocationUpdatesAsync('Location', {
            accuracy: Location.Accuracy.High,
            timeInterval: 2000,
            distanceInterval: 0
        });
    }
    stop = () => {
        this.setState({ active: false });
        Location.stopLocationUpdatesAsync('Location')
    }


    render() {
        const { active, tarif } = this.state;

        return (
            <View style={styles.track}>
                <View style={styles.trackStatus}>
                    <Text style={styles.trackStatusText}>Статус трекера:</Text>
                    {active ? <Text style={styles.trackStatusText1}>Активирован</Text> : <Text style={styles.trackStatusText2}>Не активирован</Text>}
                </View>
                <TouchableOpacity style={active ? styles.trackButton2 : styles.trackButton1} onPress={active ? this.stop : this.start}>
                    {active ? <Text style={styles.trackButtonText}>Остановить</Text> : <Text style={styles.trackButtonText}>Начать отслеживание</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.trackButtonLog} onPress={this.log}>
                    <Text style={styles.trackLogText}>Посмотреть логи</Text>
                </TouchableOpacity>
                <View style={styles.trackTarif}>
                    <Text style={styles.trackTarifText}>Ежедневная абонентская плата за использование трекера составляет {tarif} рублей</Text>
                </View>
            </View>
        )
    }
};
TaskManager.defineTask('Location', ({ data: { locations }, error }) => {
    if (error) {
        // check `error.message` for more details.
        return;
    }
    sendLocation(locations);
});

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
    }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingScreen);