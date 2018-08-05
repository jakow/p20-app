import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EmpowerPLMainScreen from './EmpowerPLDetails/EmpowerPLMainScreen';


const EmpowerPLNavigator = StackNavigator({
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
