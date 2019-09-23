import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';



class RemindScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Восстановление пароля',

            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Autorization')}/>

        };
    };

    render() {

        return (
            <View style={styles.remind}>
            <View style={styles.remindView}>
                <Text>1. Личное обращение в офис на пр, 50 летия Октября 12, ООО "Антариз"</Text>
                <Text>2. Позвонить на номер 89244565632 - звонить с номера, на который зарегистрировано приложение</Text>
            </View>
            </View>
        )
    }
};

export default RemindScreen;