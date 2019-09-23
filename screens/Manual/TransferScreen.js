import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';



class TransferScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Как пополнить баланс',

            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Profile')}
            />,

        };
    };

    render() {

        return (
            <View style={styles.remind}>
            <View style={styles.remindView}>
                <Text>1.Личное обращение в офис на пр.50 летия Октября 12, ООО "Антариз", тел 56-56-32.</Text>
                <Text>2. Оплатить на СберКарту 5469 0900 1242 7658(Евгения Анатольевна К.), в комментарии к платежу указать регистрационный номер 003001671</Text>
                <Text>3. Через СбербанкОнлайн, выбрав в разделе "Товары и Услуги" Транспорт, далее Антариз, укажите сумму и в коментарии к платежу регистрационный номер и ФИО.</Text>
                <Text>Минимальная сумма пополнения - 200 рублей</Text>
            </View>
            </View>
        )
    }
};

export default TransferScreen;