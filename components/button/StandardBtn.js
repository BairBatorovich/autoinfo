import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../../styles';

class StandardBtn extends React.Component {
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
            <TouchableOpacity onPress={ this.run } style={styles.StandardBtn}>
                <Text style={styles.btnText}>{this.props.name}</Text>       
            </TouchableOpacity>
        )
    }
};


export default StandardBtn;