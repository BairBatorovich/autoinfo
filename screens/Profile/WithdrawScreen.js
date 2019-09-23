import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from 'react-native-slider';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';



class WithdrawScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 300,
            message: '',
            modalVisible: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Вывести деньги',

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
            const response = await axios.post(`/v1/withdraw-money?access-token=${this.props.token}`,{amount:this.state.value});
            console.log(response.data);
            this.setState({modalVisible: !this.state.modalVisible, message: response.data.message });
        } catch (error) {
            console.log(error);   
        }
    }
    //Окно подтверждения вывода
    open = () => {
        this.setState({modalVisible: !this.state.modalVisible, message: 'Вывести деньги на карту?'});
    }
    //Модалка закрытие
    cancel = () => {
        this.setState({modalVisible:false})
    }

    render() {
        const { message, modalVisible } = this.state;
        return (

            <View style={styles.cardEdit}>
                <View style={styles.withdraw}>
                    <Text style={styles.withdrawText}>Задайте сумму, необходимую для вывода денег на карту</Text>
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
                    <Text>*Деньги на банковскую карту отправляются после подтверждения оператором. Оператор подтверждает в рабочие дни с 9.30 до 17.30</Text>
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
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="НЕТ"
                    confirmText="ОК"
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

export default connect(mapStateToProps)(WithdrawScreen);