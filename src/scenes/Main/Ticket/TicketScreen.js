/* @flow */

import React from 'react';
import { View, Text, Image } from 'react-native';
import icon from '../../../assets/icons/ticket.png';

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Ticket',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 28, height: 28, tintColor }}
      />),
  }

  render() {
    return (<View style={{ paddingTop: 24 }}>
      <Text>Tickets!</Text>
    </View>);
  }
}
