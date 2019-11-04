import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Linking, AsyncStorage } from 'react-native';

import styles from '../styles';
import { tokenAdd } from '../store/action/logAction';
import DrawerBtn from '../components/button/DrawerBtn';
import DrawerBtnGray from '../components/button/DrawerBtnGray';
import Logo from '../components/Logo';
import { PHONE } from '../constants'


class AppDrawer extends React.Component {

  news = () => {
    this.props.navigation.navigate('News');
  };
  profile = () => {
    this.props.navigation.navigate('Profile');
  };
  qrcode = () => {
    this.props.navigation.navigate('Qr');
  };
  track = () => {
    this.props.navigation.navigate('Track');
  };
  route = () => {
    this.props.navigation.navigate('Route');
  };
  //Звонок в техподдержку
  callphone = () => {
    Linking.openURL(`tel:${PHONE}`)
  };
  //Выход
  exit = async () => {
    let exittoken = '';
    this.props.navigation.navigate('Autorization');
    this.props.tokenAdd(exittoken);
    try {
      await AsyncStorage.setItem('@token', exittoken);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.drawer}>
        <Logo/>
        <DrawerBtn name='Профиль' run={ this.profile }/>
        <DrawerBtn name='QR код' run={ this.qrcode }/>
        <DrawerBtn name='Новости' run={ this.news }/>
        <DrawerBtn name='Трекер' run={ this.track }/>
        <DrawerBtn name='Маршруты' run={ this.route }/>
        <DrawerBtnGray name='ВЫЙТИ' run={ this.exit }/>
        <DrawerBtnGray name='Техподдержка' run={ this.callphone }/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.logReducer.token,
  }
}
const mapDispatchToProps = {
  tokenAdd
}
export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);