import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../styles';
import { tokenAdd } from '../store/action/logAction';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            errorModalMessage: '',
            focus: false,
            modalVisible: false,
            checked: true,
        }
    }

    // AsyncStorage сохранение пароля, логина, токена
    _storeData = async (token, phone, password) => {
        try {
            await AsyncStorage.setItem('@token', token);
            await AsyncStorage.setItem('@phone', phone);
            await AsyncStorage.setItem('@password', password);
        } catch (error) {
            console.log(error);
        }
    };

    // Регистраиция
    reg = () => {
        this.props.navigation.navigate('Reg');
    };

    // Авторизация
    signin = async () => {
        const { phone, password } = this.state;

        if (!phone || !password) {
            this.setState({ modalVisible: true, errorModalMessage: 'Введите логин и пароль' });
        } else {
            try {
                const response = await axios.post('/v1/auth/index', {
                    phone: phone,
                    password: password
                });
                this._storeData(response.data["access-token"], phone, password);
                this.props.tokenAdd(response.data["access-token"]);
                this.props.navigation.navigate('News');
            } catch (error) {
                switch (error.response.status) {
                    case 401:
                        console.log("пользователь не найден");
                        break;
                    case 403:
                        console.log("пароль не правильный");
                        break;
                }
            }

        }
    };
    //закрытие модального окна
    hideAlertConfirm = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    remind = () => {
        this.props.navigation.navigate('Remind')
    }
    componentWillMount = async () => {
        let phone = await AsyncStorage.getItem('@phone');
        let password = await AsyncStorage.getItem('@password');
        if(phone != '' && password != '') {
            this.setState({phone:phone, password: password})
        }
    }
    // Рендер компонента
    render() {
        const { focus, errorModalMessage, modalVisible, phone, password } = this.state;

        return (
            <View style={styles.login}>

                <View style={styles.loginInputContainer}>

                    <Icon name='bus-alt' size={120} color='#0080FF' />

                    <View style={styles.loginInputView}>
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Номер телефона"
                            multiline={false}
                            maxLength={11}
                            keyboardType={"number-pad"}
                            placeholderTextColor="#59595A"
                            onChangeText={num => this.setState({ phone: num })}
                            value = {phone}
                        />
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Пароль"
                            secureTextEntry={true}
                            placeholderTextColor="#59595A"
                            onChangeText={pas => this.setState({ password: pas })}
                            onFocus={() => this.setState({ focus: !focus })}
                            value={password}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.signin}>
                        <Text style={styles.buttonText}>ВОЙТИ</Text>
                    </TouchableOpacity>

                </View>

                {/* Регистрация и восстановление пароля */}
                <View style={!focus ? styles.loginRegRecover : styles.loginRegRecoverFocus}>

                    <TouchableOpacity style={styles.loginButtonRR} onPress={this.remind}>
                        <Text style={styles.loginRegText}>Забыли пароль?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButtonRR} onPress={this.reg}>
                        <Text style={styles.loginRegTextReg}>Регистрация</Text>
                    </TouchableOpacity>

                </View>

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
                    showCancelButton={false}
                    showConfirmButton={true}

                    confirmText="ДА"
                    confirmButtonColor="#E41D32"
                    cancelButtonColor="#FFF"
                    confirmButtonStyle={styles.AwesomeAlertConfirmButtonStyle}
                    cancelButtonTextStyle={styles.AwesomeAlertCancelButtonTextStyle}

                    onConfirmPressed={this.hideAlertConfirm}
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
const mapDispatchToProps = {
    tokenAdd
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);