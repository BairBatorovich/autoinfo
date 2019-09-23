import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../styles';



class Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number,
            id: this.props.id,
            price: this.props.price,
        };

    }
    press = () => {
        const { number, id } = this.state;
        this.props.open(number, id);
    }
    pressbuy = () => {
        this.props.open(this.state.id);
    }

    render() {

        const { number, price } = this.state;
        return (
            <TouchableOpacity style={styles.routeUrbanTouch} onPress={price == '' ? this.press : this.pressbuy}>
                {price == '' ? <Text style={styles.routeTextId}>№ {number}</Text> : <View style={styles.routeUrbanBuy}>
                    <Text style={styles.routeTextId}>№ {number}</Text>
                    <Text style={styles.routeTextId}>{price} руб.</Text>
                </View>}
            </TouchableOpacity>
        )
    }
};

export default Route;