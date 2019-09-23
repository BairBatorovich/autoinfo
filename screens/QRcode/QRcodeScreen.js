import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import * as FileSystem from 'expo-file-system';
import QRCode from 'react-native-qrcode';

import styles from '../../styles';

class QRcodeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            url: '',
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'QR код',
            headerLeft: <Icon
                name="bars"
                color="#FFF"
                size={30}
                style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />,
        };
    };
    componentDidMount = async () => {
        try {
            let url = await Axios.get(`/v1/qr/view-data?access-token=${this.props.token}`);
            this.setState({url:url.data})
        } catch (error) {
            this.setState({message:error.response.message});
        }
    }

    render() {
        const { message, url } = this.state;
        return (
            <View style={styles.track}>
                {message == null ? <QRCode value={url} size={250} bgColor='black' fgColor='white'/> : <Text>{message}</Text>}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.logReducer.token,
    }
}

export default connect(mapStateToProps)(QRcodeScreen);