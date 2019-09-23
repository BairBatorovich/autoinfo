import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

import styles from '../../styles';
import { routeInterAdd } from '../../store/action/profileAction';


class RouteInterCityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            message: '',
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Межгород',
        };
    };
    componentDidMount = async () => {
        try {
            const response = await axios.get(`/v1/intercity/get-routes?access-token=${this.props.token}`);
            this.props.routeInterAdd(response.data)
        } catch (error) {
            switch (error.response.data.status) {
                case 400:
                    this.setState({ message: error.response.data.message })
                    break;
                case 401:
                    this.setState({ message: error.response.data.message })
                    break;
                case 402:
                    this.setState({ message: error.response.data.message })
                    break;
                case 403:
                    this.setState({ message: error.response.data.message })
                    break;

                default:
                    break;
            }
        }
    }

    render() {
        const { message } = this.state;
        const { interroute } = this.props;
        
        return (
            <View style={styles.routeUrban}>
                {interroute.length > 0 ? <Text style={styles.routeUrbanText}>Здесь будет список маршрутов</Text> : <Text style={styles.routeUrbanText}>{message}</Text>}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
        interroute: state.profileReducer.interroute,
    }
}
const mapDispatchToProps = {
    routeInterAdd
}
export default connect(mapStateToProps, mapDispatchToProps)(RouteInterCityScreen);