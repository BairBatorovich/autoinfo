import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from '../styles';
import { tokenAdd } from '../store/action/logAction';


class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 565632
    }
  }
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
    Linking.openURL(`tel:${this.state.number}`)
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
      <View style={styles.drawerView}>
        <View style={styles.drawerLogo}>
          <Icon name='bus-alt' size={60} color='#0080FF' style={styles.drawerIcon} />
          <Text style={styles.drawerLogoText}>АвтоИнформатор 3</Text>
        </View>
        <TouchableOpacity onPress={this.profile} style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>Профиль</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.qrcode} style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>QR код</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.news} style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>Новости</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.track} style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>Трекер</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.route} style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>Маршруты</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.exit} style={styles.drawerExit}>
          <Text style={styles.drawerButtonText}>ВЫЙТИ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.callphone} style={styles.drawerExit}>
          <Text style={styles.drawerButtonText}>Техподдержка</Text>
        </TouchableOpacity>
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