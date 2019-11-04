import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../../styles';

class BigBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
     
      }
    stop = () => {
        this.props.stop();
    }
    start = () => {
        this.props.start();
    }

    render() {
        const { active, name1, name2 } = this.props;
        return (
            <TouchableOpacity onPress={ active ? this.stop : this.start } style={ active ? styles.bigBtnRed : styles.bigBtnBlue}>
                {active ? <Text style={styles.trackBtnText}>{name1}</Text> : <Text style={styles.trackBtnText}>{name2}</Text>}     
            </TouchableOpacity>
        )
    }
};


export default BigBtn;