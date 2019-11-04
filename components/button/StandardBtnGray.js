import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../../styles';

class StandardBtnGray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
     
      }

    render() {
        return (
            <TouchableOpacity style={styles.standardBtnGray}>
                <Text style={styles.btnText}>{this.props.name}</Text>       
            </TouchableOpacity>
        )
    }
};


export default StandardBtnGray;