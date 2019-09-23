import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';
import { profileAdd, routeAdd } from '../../store/action/profileAction';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            sname: '',
            numbercar: '',

            balance: 0,
            limit: 0,
            mainRoute: '',
            fuelCard: '',
            phone: '',
            modalVisible: false,
            message: '',
            cardNumber: '',
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Профиль',
            headerLeft: <Icon
                name="bars"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />,
        };
    };

    //Переходы по экранам
    transfer = () => {
        this.props.navigation.navigate('Transfer');
    }
    editCard = () => {
        this.props.navigation.navigate('MyCard');
    }
    addRoute = () => {
        this.props.navigation.navigate('Addroute')
    }
    withdraw = () => {
        this.props.navigation.navigate('Withdraw')
    }
    withdrawFC = () => {
        this.props.navigation.navigate('WithdrawFC')
    }
    transaction = () => {
        this.props.navigation.navigate('Transaction')
    }
    myroute = () => {
        this.props.navigation.navigate('MyRoute')
    }

    //Модалка закрытие
    cancel = () => {
        this.setState({ modalVisible: false })
    }
    //Удаление маршрута
    delRoute = async () => {
        this.setState({ modalVisible: false })
        try {
            const response = await axios.post(`/v1/route/delete-main-route?access-token=${this.props.token}`);
            if (response.status == 200) {
                this.setState({ modalVisible: true, message: response.data.message });
                this.update();
            }
        } catch (error) {
            console.log(error);
        }
    }
    delAlert = async () => {
        this.setState({ modalVisible: true, message: 'Удалить основной маршрут' })
    }
    //Обновление профиля
    update = async () => {
        try {
            const response = await axios.get(`/v1/profile/index?access-token=${this.props.token}`);

            if (response.data.status == 20) {
                this.props.profileAdd(response.data);
                this.setState({
                    fname: response.data.profile.first_name,
                    lname: response.data.profile.last_name,
                    sname: response.data.profile.surname,
                    numbercar: response.data.profile.number_car,
                    balance: response.data.profile.balance,
                    limit: response.data.profile.limit,
                    mainRoute: response.data.profile.mainRoute,
                    fuelCard: response.data.fuel_card,
                    cardNumber: response.data.profile.cardNumber,
                })
            } else {
                this.setState({ modalVisible: true, message: 'Профиль не загружен. Проверьте интернет соединение' })
            }

        } catch (error) {
            console.log(error);
        }
    }
    //монтирование списка маршрутова в стор
    componentWillMount = async () => {
        this.update();
    }
    componentDidMount = async () => {
        if (this.props.listroute.length == 0) {
            try {
                console.log('axios work');
                const listRoute = await axios.get(`/v1/route/all?access-token=${this.props.token}`);
                this.props.routeAdd(listRoute.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        const { fname, lname, sname, numbercar, balance, limit,
            mainRoute, fuelCard, cardNumber, modalVisible, message } = this.state;

        return (
            <ScrollView>
                <View style={styles.profileView}>

                    <TextInput
                        style={styles.loginInputText}
                        editable={false}
                        value={sname}
                        multiline={false}
                        maxLength={30}
                        keyboardType={"number-pad"}
                        placeholderTextColor="#59595A"
                        onChangeText={value => this.setState({ sname: value })}
                    />
                    <TextInput
                        style={styles.loginInputText}
                        editable={false}
                        value={fname}
                        multiline={false}
                        maxLength={30}
                        keyboardType={"number-pad"}
                        placeholderTextColor="#59595A"
                        onChangeText={value => this.setState({ fname: value })}
                    />
                    <TextInput
                        style={styles.loginInputText}
                        editable={false}
                        value={lname}
                        multiline={false}
                        maxLength={30}
                        keyboardType={"number-pad"}
                        placeholderTextColor="#59595A"
                        onChangeText={value => this.setState({ lname: value })}
                    />
                    <TextInput
                        style={styles.loginInputText}
                        editable={false}
                        value={numbercar}
                        multiline={false}
                        maxLength={15}
                        keyboardType={"number-pad"}
                        placeholderTextColor="#59595A"
                    // onChangeText={value => this.setState({ numbercar: value })}
                    />

                    {/* Добавление удаление маршрута */}
                    {mainRoute == '' ? <View>
                        <TouchableOpacity style={styles.profileRoute} onPress={this.addRoute}>
                            <Text style={styles.profileRouteText}>Добавить машрут</Text>
                            <Icon2
                                name="plus-box-outline"
                                color='#0080FF'
                                size={32}
                            />
                        </TouchableOpacity>
                    </View> : <TouchableOpacity style={styles.profileRoute} onPress={this.delAlert}>
                            <Text style={styles.profileRouteText}>Основной маршрут: {mainRoute}</Text>
                            <Icon2
                                name="delete"
                                color='#0080FF'
                                size={32}
                            />
                        </TouchableOpacity>
                    }

                    <Text style={styles.profileText}>{balance + " руб."}</Text>
                    <Text style={styles.profileText}>{limit} лимит</Text>

                    {/* Добавить изменить Банковскую карту */}
                    {cardNumber == '' ? <TouchableOpacity onPress={this.editCard} style={styles.profileRoute}>
                        <Text style={styles.profileRouteText}>Добавить карту</Text>
                        <Icon2
                            name="plus-box-outline"
                            color='#0080FF'
                            size={32}
                        />
                    </TouchableOpacity> : <TouchableOpacity onPress={this.editCard} style={styles.profileRoute}>
                            <Text style={styles.profileRouteText}>{cardNumber}</Text>
                            <Icon2
                                name="pencil"
                                color='#0080FF'
                                size={32}
                            />
                        </TouchableOpacity>}
                    { balance < 300 ? <TouchableOpacity style={styles.buttonOff}>
                        <Text style={styles.buttonText}>Вывести деньги</Text>
                    </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={this.withdraw}>
                            <Text style={styles.buttonText}>Вывести деньги</Text>
                        </TouchableOpacity>}
               { balance < 300 ? <TouchableOpacity style={styles.buttonOff}>
                        <Text style={styles.buttonText}>Вывести деньги на топливную карту</Text>
                    </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={this.withdrawFC}>
                        <Text style={styles.buttonText}>Вывести деньги на топливную карту</Text>
                    </TouchableOpacity>}

                    <TouchableOpacity style={styles.button} onPress={this.transaction}>
                        <Text style={styles.buttonText}>Список транзакций</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.myroute}>
                        <Text style={styles.buttonText}>Мои маршруты</Text>
                    </TouchableOpacity>

                    <View style={styles.profileButBlock}>
                        <TouchableOpacity style={styles.profileButton} onPress={this.transfer}>
                            <Text style={styles.buttonText}>Как пополнить баланс</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileButton} onPress={this.update}>
                            <Text style={styles.buttonText}>Обновить профиль</Text>
                        </TouchableOpacity>
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
                        confirmText="ДА"
                        confirmButtonColor="#E41D32"
                        cancelButtonColor="#FFF"
                        confirmButtonStyle={styles.AwesomeAlertConfirmButtonStyle}
                        cancelButtonTextStyle={styles.AwesomeAlertCancelButtonTextStyle}

                        onConfirmPressed={this.delRoute}
                        onCancelPressed={this.cancel}
                    />
                </View>

            </ScrollView>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
        profile: state.profileReducer.profile,
        listroute: state.profileReducer.listroute,
    }
}
const mapDispatchToProps = {
    profileAdd,
    routeAdd
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);