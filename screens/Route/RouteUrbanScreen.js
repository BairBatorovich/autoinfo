import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';
import { routeAdd } from '../../store/action/profileAction';
import Route from '../../components/route';

class RouteUrbanScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            errorModalMessage: '',
            id: '',
            modalVisible2: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Город',
        };
    };
    //монтирование списка маршрутова в стор
    componentWillMount = async () => {
        if (this.props.listroute.length == 0) {
            try {
                const listRoute = await axios.get(`/v1/route/all?access-token=${this.props.token}`);
                this.props.routeAdd(listRoute.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
    //открыть окно подтверждения покупки
    openbuy = (id) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            errorModalMessage: 'Для покупки данного маршрута необходимо нажать Продолжить',
            id: id
        })
    }
    //закрытие окна подтверждения покупки
    cancelbuy = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }
    //подтверждение покупки
    confirmbuy = async () => {
        this.setState({ modalVisible: !this.state.modalVisible });

        try {
            const buyRoute = await axios.post(`/v1/route/buy?access-token=${this.props.token}`, { id: this.state.id });
            this.setState({ modalVisible2: true, errorModalMessage: 'Маршрут оплачен' })
        } catch (error) {
            switch (error.response.status) {
                case 400:
                    console.log(error.response.data.message);
                    break;
                case 401:
                    console.log(error.response.data.message);
                    break;
                case 402:
                    console.log(error.response.data.message);
                    break;
                case 403:
                    console.log(error.response.data.message);
                    break;
                case 404:
                    console.log(error.response.data.message);
                    break;
                default:
                    break;
            }
        }
    }
   
    render() {
        const { listroute } = this.props;
        const { modalVisible, errorModalMessage, modalVisible2 } = this.state;

        return (
            <View style={styles.routeUrban}>
                <Text style={styles.routeUrbanText}>Маршрут оплачивается единожды</Text>
                <ScrollView>
                    {listroute.map(route => <Route
                        key={route.id}
                        id={route.id}
                        number={route.number}
                        price={route.sellingPrice}
                        open={this.openbuy}
                    />)}
                </ScrollView>

                {/* Модальное окно */}
                <AwesomeAlert
                    show={modalVisible}
                    showProgress={false}
                    contentContainerStyle={styles.AwesomeAlertContentContainerStyle}
                    title="Внимание!"
                    titleStyle={styles.AwesomeAlertTitleStyle}
                    message={errorModalMessage}
                    messageStyle={styles.AwesomeAlertMessageStyle}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Отмена"
                    confirmText="Продолжить"
                    confirmButtonColor="#E41D32"
                    cancelButtonColor="#FFF"
                    confirmButtonStyle={styles.routeConfirmButton}
                    cancelButtonTextStyle={styles.AwesomeAlertCancelButtonTextStyle}
                    onCancelPressed={this.cancelbuy}
                    onConfirmPressed={this.confirmbuy}
                />
                <AwesomeAlert
                    show={modalVisible2}
                    showProgress={false}
                    contentContainerStyle={styles.AwesomeAlertContentContainerStyle}
                    title="Внимание!"
                    titleStyle={styles.AwesomeAlertTitleStyle}
                    message={errorModalMessage}
                    messageStyle={styles.AwesomeAlertMessageStyle}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={false}
                    cancelText="Закрыть"
                    confirmText="ДА"
                    confirmButtonColor="#E41D32"
                    cancelButtonColor="#FFF"
                    confirmButtonStyle={styles.AwesomeAlertConfirmButtonStyle}
                    cancelButtonTextStyle={styles.AwesomeAlertCancelButtonTextStyle}
                    onCancelPressed={() => this.setState({ modalVisible2: false })}
                    onConfirmPressed={this.hideAlertConfirm}
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
const mapDispatchToProps = {
    routeAdd
}
export default connect(mapStateToProps, mapDispatchToProps)(RouteUrbanScreen);