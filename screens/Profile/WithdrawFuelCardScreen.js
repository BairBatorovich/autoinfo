import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from 'react-native-slider';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';



class WithdrawFuelCardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 300,
            modalVisible: false,
            message: '',
            withdraw: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Вывести деньги на ТК',

            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Profile')}
            />,

        };
    };
    //Запрос на вывод
    withdraw = async () => {
        try {
            console.log('300');
            
            // const response = await axios.post(`/v1/withdraw-to-fuel-card?access-token=${this.props.token}`,{amount:this.state.value});
            // console.log(response.data);
            this.setState({modalVisible: true, message: 'Заявка на вывод принята', withdraw: !this.state.withdraw});
        } catch (error) {
            console.log(error);   
        }
    }
    //Окно подтверждения вывода
    open = () => {
        this.setState({modalVisible: !this.state.modalVisible, message: 'Вывести деньги на топливную карту?', withdraw: !this.state.withdraw});
    }
    //Модалка закрытие
    cancel = () => {
        this.setState({modalVisible:false})
    }


    render() {
        const { message, modalVisible, withdraw } = this.state;
        return (

            <View style={styles.cardEdit}>
                <View style={styles.withdraw}>
                    <Text style={styles.withdrawText}>Задайте сумму, необходимую для вывода денег на топливную карту</Text>
                    <Text style={styles.withdrawValue}>{this.state.value} руб.</Text>
                    <Slider
                        value={300}
                        minimumValue={300}
                        maximumValue={10000}
                        step={100}
                        thumbTintColor='green'
                        onValueChange={(value) => this.setState({ value: value })}
                        style={styles.slider}
                        trackStyle={styles.slider}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.open}>
                        <Text style={styles.buttonText}>Вывести деньги</Text>
                    </TouchableOpacity>
                    <Text>*Деньги на топливную карту отправляются после подтверждения оператором. Оператор подтверждает в рабочие дни с 9.30 до 17.30</Text>
                </View>

                {/* Модальное окно */}
                <AwesomeAlert
                    show={modalVisible}
                    showProgress={false}
                    contentContainerStyle={styles.AwesomeAlertContentContainerStyle}
                    title="Внимание!"
                    titleStyle={styles.AwesomeAlertTitleStyle}
                    message={message}
                    messageStyle={styles.AwesomeAlertMessageStyle}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={ withdraw ? true : false }
                    showConfirmButton={ withdraw ? true : false }
                    cancelText="ОТМЕНА"
                    confirmText="ДА"
                    confirmButtonColor="#E41D32"
                    cancelButtonColor="#FFF"
                    confirmButtonStyle={styles.AwesomeAlertConfirmButtonStyle}
                    cancelButtonTextStyle={styles.AwesomeAlertCancelButtonTextStyle}
                    onCancelPressed={this.cancel}
                    onConfirmPressed={this.withdraw}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
    }
}

export default connect(mapStateToProps)(WithdrawFuelCardScreen);