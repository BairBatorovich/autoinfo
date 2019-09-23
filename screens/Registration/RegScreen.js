import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

import styles from '../../styles';



class RegScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surname: '',
            first_name: '',
            last_name: '',
            number_car: '',
            phone: '',
            city_id: 1,
            password1: '',
            password2: '',

            errorModalMessage: '',
            modalVisible: false,
            modalVisible2: false,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Регистрация',

            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Autorization')}/>
        };
    };
    //закрытие модального окна
    hideAlertConfirm = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    //запрос на регистрацию
    reg = async () => {
        const { password1, password2, last_name, first_name, surname, phone, number_car, city_id } = this.state;
      
        if (password1 == password2) {
            if (last_name || first_name || surname || phone || number_car) {
                try {
                    const reg = await axios.post('/v1/register/index', {
                        city_id: city_id,
                        phone: phone,
                        password: password1,
                        surname: surname,
                        first_name: first_name,
                        last_name: last_name,
                        number_car: number_car,
                    });
                    this.setState({modalVisible2: true, errorModalMessage: 'Вы зарегистрированны'})
                } catch (error) {
                    switch (error.response.data.status) {
                        case 400:
                            console.log(error.response.data.message);
                            this.setState({modalVisible2: true, errorModalMessage: error.response.data.message})
                            break;
                        case 401:
                            console.log(error.response.data.message);
                            this.setState({modalVisible2: true, errorModalMessage: error.response.data.message})
                            break;
                        case 402:
                            console.log(error.response.data.message);
                            this.setState({modalVisible2: true, errorModalMessage: error.response.data.message})
                            break;
                        case 403:
                            console.log(error.response.data.message);
                            this.setState({modalVisible2: true, errorModalMessage: error.response.data.message})
                            break;
                        case 404:
                            console.log(error.response.data.message);
                            this.setState({modalVisible2: true, errorModalMessage: error.response.data.message})
                            break;
                        default:
                            break;
                    }
                }                
                    
              
            } else {
                console.log('Заполните все поля');
                this.setState({ errorModalMessage: "Заполните все поля", modalVisible: true });
            }
        } else {
            this.setState({ modalVisible: true, errorModalMessage: 'Введенные пароли не совпадают' });
        }
    }

    render() {
        const { errorModalMessage, modalVisible, modalVisible2 } = this.state;
        return (
            <ScrollView>

                <View style={styles.RegInputContainer}>

                    <View style={styles.loginInputView}>
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Фамилия"
                            maxLength={30}
                            multiline={false}
                            placeholderTextColor="#59595A"
                            onChangeText={value => this.setState({ surname: value })}
                        />
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Имя"
                            maxLength={30}
                            multiline={false}
                            placeholderTextColor="#59595A"
                            onChangeText={name => this.setState({ first_name: name })}
                        />
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Отчество"
                            maxLength={30}
                            multiline={false}
                            placeholderTextColor="#59595A"
                            onChangeText={value => this.setState({ last_name: value })}
                        />
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Номер телефона"
                            keyboardType={"number-pad"}
                            multiline={false}
                            maxLength={11}
                            placeholderTextColor="#59595A"
                            onChangeText={num => this.setState({ phone: num })}
                        />
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Номер машины"
                            multiline={false}
                            maxLength={15}
                            placeholderTextColor="#59595A"
                            onChangeText={num => this.setState({ number_car: num })}
                        />
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Введите пароль"
                            secureTextEntry={true}
                            multiline={false}
                            maxLength={15}
                            placeholderTextColor="#59595A"
                            onChangeText={num => this.setState({ password1: num })}
                        />
                        <TextInput
                            style={styles.loginInputText}
                            placeholder="Повторите пароль"
                            secureTextEntry={true}
                            multiline={false}
                            maxLength={15}
                            placeholderTextColor="#59595A"
                            onChangeText={num => this.setState({ password2: num })}
                        />

                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.reg}>
                        <Text style={styles.buttonText}>Регистрация</Text>
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
                    onCancelPressed={() => this.setState({modalVisible2:false})}
                    onConfirmPressed={this.hideAlertConfirm}
                />
            </ScrollView>
        )
    }
};

export default RegScreen;