import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EmpowerPLMainScreen from './EmpowerPLDetails/EmpowerPLMainScreen';
import icon from './assets/EmpowerPLlogo.png';



const EmpowerPLNavigator = createStackNavigator({
  List: {
    screen: EmpowerPLMainScreen,
  }

}, {
  headerMode: 'screen',
});

export default class EmpowerPLScreen extends React.Component {
  static router = EmpowerPLNavigator.router;
  static navigationOptions = {
    tabBarLabel: 'EmpowerPL',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 27, height: 27, tintColor }}
      />),
  }

  render() {
    return <EmpowerPLNavigator navigation={this.props.navigation} />;
  }
}
