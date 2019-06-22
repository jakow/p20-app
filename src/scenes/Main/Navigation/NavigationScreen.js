import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import NavigationMainScreen from './NavigationDetails/NavigationMainScreen';
import icon from './assets/pin.png';



const NavigationNavigator = createStackNavigator({
  List: {
    screen: NavigationMainScreen,
  }
}, {
  headerMode: 'screen',
});

export default class NavigationScreen extends React.Component {
  static router = NavigationNavigator.router;
  static navigationOptions = {
    tabBarLabel: 'Navigation',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 27, height: 27, tintColor }}
      />),
  }

  render() {
    return <NavigationNavigator navigation={this.props.navigation} />;
  }
}
