/* @flow */

import React from 'react';
import { View, Text, Image } from 'react-native';
import icon from '../../../assets/icons/home.png';

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 28, height: 28, tintColor }}
      />),
  }

  render() {
    return (<View style={{ paddingTop: 24 }}>
      <Text>Home</Text>
    </View>);
  }
}
