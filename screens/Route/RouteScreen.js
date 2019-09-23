import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from 'react-navigation-drawer';

import styles from '../../styles';
import Tabnavigator from '../../navigation/TabNavigator'



class RouteScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Список маршрутов',
            headerLeft: <Icon
                name="bars"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
        };
    };


    render() {

        return (
            <Tabnavigator />
        );
    }
};

export default RouteScreen;