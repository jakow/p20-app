/* @flow */

import React from 'react';
import { View, Text, Image } from 'react-native';
import icon from '../../../assets/icons/list.png';

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Agenda',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 27, height: 27, tintColor }}
      />),
  }

  render() {
    return (<View style={{ paddingTop: 24 }}>
      <Text>Agenda</Text>
    </View>);
  }
}
