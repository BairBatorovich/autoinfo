import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../../styles';

class DrawerBtnGray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
     
      }
    run = () => {
        this.props.run();
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.run } style={ styles.drawerBtnGray }>
                <Text style={ styles.drawerBtnText }>{ this.props.name }</Text>       
            </TouchableOpacity>
        )
    }
};


export default DrawerBtnGray;