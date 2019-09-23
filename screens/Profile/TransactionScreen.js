import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from "moment";

import styles from '../../styles';
import { transactionAdd } from '../../store/action/profileAction';


class TransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 300,
            page: 1,
            message: '',
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Список транзакций',

            headerLeft: <Icon
                name="angle-left"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate('Profile')} />
        };
    };
    componentDidMount = async () => {
        if (this.props.transaction == 0) {
            try {
                const response = await axios.get(`/v1/transaction/index?access-token=${this.props.token}&page=${this.state.page}`);
                if (response.data.length != 0) {
                    this.props.transactionAdd(response.data);
                } else {
                    this.setState({ message: 'Список транзакций пуст' });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        const { transaction } = this.props;
        
        return (
            <FlatList
                data={ transaction }
                renderItem={ ({ item }) => <View style={styles.transaction}>
                    { item.description == 'Пополнение' ? <Text style={styles.transactionText}>{item.description} 
                    : {item.sum} руб. { moment(item.created_at*1000).format('L') }</Text> : <Text style={styles.transactionTextW}>
                    {item.description}: {item.sum} руб. { moment(item.created_at*1000).format('L') }
                    </Text>}
                </View> }
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
        transaction: state.profileReducer.transaction,
    }
}
const mapDispatchToProps = {
    transactionAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreen);