import * as React from 'react';
import { Dimensions } from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createDrawerNavigator
} from 'react-navigation';

import AppDrawer from './AppDrawer';
import LoginScreen from '../screens/LoginScreen';
import RegScreen from '../screens/Registration/RegScreen';
import RemindScreen from '../screens/Registration/RemindScreen'
import NewsScreen from '../screens/News/NewsScreen';
import NewsDetailScreen from '../screens/News/NewsDetailScreen';
import RouteScreen from '../screens/Route/RouteScreen';
import QrcodeScreen from '../screens/QRcode/QRcodeScreen';
import RouteAddScreen from '../screens/Route/RouteAddScreen';
import TrackingScreen from '../screens/Tracking/TrackingScreen';
import TrackingLogScreen from '../screens/Tracking/TrackingLogScreen';
import TransferScreen from '../screens/Manual/TransferScreen';
import MyCardScreen from '../screens/Profile/MyCardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import WithdrawScreen from '../screens/Profile/WithdrawScreen';
import TransactionScreen from '../screens/Profile/TransactionScreen';
import WithdrawFuelCardScreen from '../screens/Profile/WithdrawFuelCardScreen';
import MyRouteScreen from '../screens/Route/MyRouteScreen';
import MyIdRouteScreen from '../screens/Route/MyIdRouteScreen';



 
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const styleHeader = {
    headerStyle: {
        backgroundColor: '#0080FF',
    },
    headerTitleStyle: {
        color: 'white',
    },
    headerBackTitleStyle: {
        color: 'white',
    },
};

const RegStack = createStackNavigator(
    {
        Reg: {
            screen: RegScreen,
        },
        Remind: {
            screen: RemindScreen,
        },
    },
    {
        defaultNavigationOptions: styleHeader,
        headerLayoutPreset: 'center',
    }
);

const NewsStack = createStackNavigator(
    {
        News: {
            screen: NewsScreen,
        },
        NewsDetail: {
            screen: NewsDetailScreen,
        },
    },
    {
        defaultNavigationOptions: styleHeader,
        headerLayoutPreset: 'center',
        headerBackTitleStyle: {
            color: 'white',
        },
    }
);
const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreen,
        },
        Transfer: {
            screen: TransferScreen,
        },
        MyCard: {
            screen: MyCardScreen,
        },
        Withdraw: {
            screen: WithdrawScreen,
        },
        WithdrawFC: {
            screen: WithdrawFuelCardScreen,
        },
        Transaction: {
            screen: TransactionScreen,
        },
        Qr: {
            screen: QrcodeScreen,
        },
        MyRoute: {
            screen: MyRouteScreen,
        },
        IdRoute: {
            screen: MyIdRouteScreen,
        }
    },
    {
        defaultNavigationOptions: styleHeader,
        headerLayoutPreset: 'center',
    }
);
const RouteStack = createStackNavigator(
    {
        Route: {
            screen: RouteScreen,
        },
        Track: {
            screen: TrackingScreen,
        },
        TrackLog: {
            screen: TrackingLogScreen,
        },
        Addroute: {
            screen: RouteAddScreen,
        },
    },
    {
        defaultNavigationOptions: styleHeader,
        headerLayoutPreset: 'center',
        headerBackTitleStyle: {
            color: 'white',
        },
    }
);

const AppStack = createDrawerNavigator(
    {
        New: NewsStack,
        Prof: ProfileStack,
        Rout: RouteStack,
    },
    {
        drawerWidth: WIDTH * 0.8,
        contentComponent: AppDrawer,
        contentOptions: {
            activeBackgroundColor: 'transparent',
            activeTintColor: 'white',
        }
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            Autorization: LoginScreen,
            Registration: RegStack,
            App: AppStack
        },
        {
            initialRouteName: 'Autorization',
            defaultNavigationOptions: styleHeader,
            headerMode: 'screen'
        }
    )
);