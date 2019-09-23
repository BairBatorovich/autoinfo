import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';

import styles from '../../styles';



class TrackingLogScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Трекер',
            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Track')}/>
        };
    };
    componentDidMount = () => {

    }

    render() {
        
        return (
            <View>
                <Text>logi</Text>
                
            </View>
        )
    }
};

export default TrackingLogScreen;