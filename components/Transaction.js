import React from 'react';
import { Text, View } from 'react-native';
import moment from "moment";

import styles from '../styles';

class Transaction extends React.Component {

    render() {
        const { sum, description, created_at } = this.props;
        return (
            <View style={styles.transaction}>
                {
                    sum > 0 ? <View style={styles.transactionPlus}>
                        <Text style={styles.transactionTxtPlus}>{description}: </Text>
                        <Text style={styles.transactionTxtPlusDate}>{sum} руб. {moment(created_at * 1000).format('DD.MM.YY hh:mm')}</Text>
                        </View> :
                        <Text style={styles.transactionTxtMinus}>{description}: {sum} руб. {moment(created_at * 1000).format('DD.MM.YY')}</Text>
                }
            </View>
        )
    }
};


export default Transaction;