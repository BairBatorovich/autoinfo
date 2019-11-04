import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../../styles';
import { transactionAdd } from '../../store/action/profileAction';
import StandardBtn from '../../components/button/StandardBtn';
import Transaction from '../../components/Transaction';


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
    download = async () => {
        let transaction = [];
        let lastTransaction = '';
        for (i = 1; i < 100; i++) {
            try {
                const response = await axios.get(`/v1/transaction/index?access-token=${this.props.token}&page=${i}`);
                if (response.data.length > 0) {
                    if (lastTransaction == response.data[response.data.length - 1].id) {
                        lastTransaction = response.data[response.data.length - 1].id;
                        break;
                    } else {
                        lastTransaction = response.data[response.data.length - 1].id;
                        transaction = [...transaction, ...response.data];
                        this.props.transactionAdd(transaction);
                    }
                } else {
                    this.setState({ message: 'Список транзакций пуст' });
                    break;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    componentDidMount = async () => {
        if (this.props.transaction == 0) {
            this.download();
        }
    }

    render() {
        const { transaction } = this.props;

        return (
            <View style={styles.transactionScreen}>
                <FlatList
                    data={transaction}
                    renderItem={({ item }) => <Transaction
                        sum={item.sum}
                        description={item.description}
                        created_at={item.created_at}
                        />}
                    keyExtractor={(item, index) => index.toString()}
                />
                <StandardBtn name='Обновить' run={this.download} />
            </View>
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