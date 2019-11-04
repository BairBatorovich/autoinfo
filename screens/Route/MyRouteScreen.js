import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../styles';
import MyRoute from '../../components/myRoute';

class MyRouteScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            errorModalMessage: '',
            id: '',
            modalVisible2: false,
            array: [],
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Мои маршруты',
            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Profile')} />
        };
    };
    openid = () => {
        this.props.navigation.navigate('IdRoute');
    }
    //закрытие окна подтверждения покупки
    cancelbuy = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    render() {
        const { myRoute, token } = this.props;
        const { modalVisible, errorModalMessage, modalVisible2 } = this.state;

        return (
            <View style={styles.routeUrban}>
                <FlatList
                    data={myRoute}
                    renderItem={({ item }) => <MyRoute
                        key={item.id}
                        id={item.id}
                        ways={item.ways}
                        number={item.number}
                        price={item.sellingPrice}
                        open={this.openid}
                    />}
                    keyExtractor={(item, index) => index.toString()}
                />

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
        token: state.logReducer.token,
        myRoute: state.profileReducer.myRoute,
        idRoute: state.profileReducer.idRoute,
    }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(MyRouteScreen);