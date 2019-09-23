import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';



class MyCardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: this.props.profile.profile.cardNumber,
            owner: '',
            date: '',
            status: '',
            year: '',
            month: '',
            modalVisible: false,
            message: ''
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Банковская карта',

            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Profile')}
            />,

        };
    };
     //Переходы по экранам
     profile = () => {
        this.props.navigation.navigate('Profile');
        this.setState({modalVisible:false})
    }

    //Изменение Обновление карты
    edit = async () => {
        const { cardNumber, owner, year, month } = this.state;
        const { token } = this.props;
        let d = `${parseInt(year) + 2000}-${month}-01`;

        try {
            const response = await axios.post(`/v1/card/update?access-token=${token}`,
                {
                    number: cardNumber,
                    owner: owner,
                    expiration_date: d
                }
            );
            if(response.status == 200) {
                this.setState({modalVisible: true, message:'Данные карты изменены. Нажмите ОК чтобы перейти в профиль'})
            }
            console.log(response);
        } catch (error) {
            console.log(error.response.data.status);
            console.log(error.response.data.message);
        }
    }

    //Добавление карты
    addCard = async () => {
        const { cardNumber, owner, date } = this.state;
        try {
            const response = await axios.post(`/v1/card/add?access-token=${token}`, {
                number: cardNumber,
                owner: owner,
                expiration_date: date
            });
            console.log(response);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    componentWillMount = async () => {
        if (this.state.cardNumber != '' && this.state.cardNumber != undefined) {
            try {
                const card = await axios.get(`/v1/card/view?access-token=${this.props.token}`);
                this.setState({
                    cardNumber: card.data.number,
                    owner: card.data.owner,
                    date: card.data.expiration_date
                });
                this.monthyear();
            } catch (error) {
                switch (error.response.status) {
                    case 404:
                        this.setState({ status: error.response })
                        break;
                    default:
                        break;
                }
            }
        } else {
            console.log('загрузки карты не будет надо добавить карту');
        }
    }
    //строка в дату месяц/год
    monthyear = () => {
        let d = new Date(this.state.date);
        this.setState({ year: (d.getFullYear() - 2000), month: (d.getMonth() + 1) })
    }

    render() {
        const { cardNumber, owner, year, month, modalVisible, message } = this.state;

        return (

            <View style={styles.cardEdit}>
                <TextInput
                    style={styles.loginInputText}
                    placeholder='Номер карты'
                    multiline={false}
                    maxLength={20}
                    value={cardNumber}
                    keyboardType={"number-pad"}
                    placeholderTextColor="#59595A"
                    onChangeText={value => this.setState({ cardNumber: value })}
                />
                <TextInput
                    style={styles.loginInputText}
                    value={owner}
                    placeholder='Имя Фамилия'
                    multiline={false}
                    maxLength={30}
                    keyboardType={"name-phone-pad"}
                    placeholderTextColor="#59595A"
                    onChangeText={value => this.setState({ owner: value })}
                />
                {/* Год Месяц Инпут */}
                <View style={styles.cardMonthYear}>
                    <TextInput
                        style={styles.cardInputDate}
                        value={String(month)}
                        placeholder='Месяц'
                        multiline={false}
                        maxLength={2}
                        keyboardType={"number-pad"}
                        placeholderTextColor="#59595A"
                        onChangeText={value => this.setState({ month: value })}
                    />
                    <TextInput
                        style={styles.cardInputDate}
                        value={String(year)}
                        placeholder='Год'
                        multiline={false}
                        maxLength={2}
                        keyboardType={"number-pad"}
                        placeholderTextColor="#59595A"
                        onChangeText={value => this.setState({ year: value })}
                    />
                </View>

                {/* Кнопка */}
                {cardNumber == '' && cardNumber == undefined ? <TouchableOpacity style={styles.button} onPress={this.addCard}>
                    <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={this.edit}>
                        <Text style={styles.buttonText}>Изменить</Text>
                    </TouchableOpacity>}

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
                    showCancelButton={false}
                    showConfirmButton={true}

                    confirmText="ОК"
                    confirmButtonColor="#E41D32"
                    cancelButtonColor="#FFF"
                    confirmButtonStyle={styles.AwesomeAlertConfirmButtonStyle}
                    cancelButtonTextStyle={styles.AwesomeAlertCancelButtonTextStyle}

                    onConfirmPressed={this.profile}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
        profile: state.profileReducer.profile,
    }
}
// const mapDispatchToProps = {
//     profileAdd,
//     routeAdd
// }
export default connect(mapStateToProps)(MyCardScreen);