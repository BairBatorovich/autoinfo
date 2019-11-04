import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../styles';

class Logo extends React.Component {

    render() {
        return (
            <View style={styles.logo}>
                <Icon name='bus-alt' size={60} color='#0080FF' style={styles.logoIcon} />
                <Text style={styles.logoText}>АвтоИнформатор</Text>
            </View>
        )
    }
};


export default Logo;