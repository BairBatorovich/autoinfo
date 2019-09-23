import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';
import Route from '../../components/route';



class RouteAddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            message: '',
            id: '',
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Выбор маршрута',
            headerLeft: <Icon
            name="angle-left"
            color="#FFF"
            size={30}
            style={{ marginLeft: 20 }}
            onPress={() => navigation.navigate('Profile')} />
        };
    };
    //Закрыть модалку
    cancel = () => {
        this.setState({modalVisible:false})
    }
    //Открыть модалку вывести сообщение
    openbuy = (number, id) => {
        console.log(number, id);
        this.setState({ modalVisible:true, message: `Добавить основной машрут№${number}`, id: id });
    }
    //Выбор маршрута
    addRoute = async () => {
        this.setState({modalVisible:false})
        try {
            const response = await axios.post(`/v1/route/add-main-route?access-token=${this.props.token}`, { route_id: this.state.id });
            if(response.status != 200) {
                this.setState({modalVisible:true, message: 'Маршрут недобавлен, попробуйте еще раз'});
            }
        } catch (error) {
         console.log(error);
        }
    }

    render() {
        const { listroute } = this.props;
        const { modalVisible, message} = this.state;
        
        return (
            <View style={styles.routeUrban}>
            <ScrollView>
                {listroute.map(route => <Route key={route.id} id={route.id} number={route.number} price={''} open={this.openbuy}/>)}
            </ScrollView>

            {/* Модальное окно */}
            <AwesomeAlert
                    show={modalVisible}
                    showProgress={false}
                    contentContainerStyle= { styles.AwesomeAlertContentContainerStyle }
                    title="Внимание!"
                    titleStyle = { styles.AwesomeAlertTitleStyle }
                    message={ message }
                    messageStyle = { styles.AwesomeAlertMessageStyle }
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="НЕТ"
                    confirmText="ДА"
                    confirmButtonColor="#E41D32"
                    cancelButtonColor="#FFF"
                    confirmButtonStyle={ styles.AwesomeAlertConfirmButtonStyle }
                    cancelButtonTextStyle={ styles.AwesomeAlertCancelButtonTextStyle }
                    
                    onConfirmPressed={this.addRoute}
                    onCancelPressed={this.cancel}
                    />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        listroute: state.profileReducer.listroute,
        token: state.logReducer.token,
    }
}

export default connect(mapStateToProps)(RouteAddScreen);