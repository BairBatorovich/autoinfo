import {
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';
import RouteUrbanScreen from '../screens/Route/RouteUrbanScreen';
import RouteInterCityScreen from '../screens/Route/RouteInterCityScreen'

const TabNavigator = createMaterialTopTabNavigator(
    {
        Urban: RouteUrbanScreen,
        Inter: RouteInterCityScreen,
    },
    {
        initialRouteName: 'Urban',
        tabBarOptions: {
            labelStyle: {
                fontSize: 12
            },
            indicatorStyle: {
                backgroundColor:'#FFFFFF'
            },
            style: {
                backgroundColor: '#0080FF',
            }
        }
    }
);

export default createAppContainer(TabNavigator);