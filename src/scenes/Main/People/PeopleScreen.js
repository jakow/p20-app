/* @flow */

import React from 'react';
import { View, Text, Image } from 'react-native';
import icon from '../../../assets/icons/people.png';

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 28, height: 25, tintColor }}
      />),
  }

  render() {
    return (<View style={{ paddingTop: 24 }}>
      <Text>People</Text>
    </View>);
  }
}
