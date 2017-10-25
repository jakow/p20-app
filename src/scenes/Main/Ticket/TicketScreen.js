/* @flow */

import React from 'react';
import { View, Image } from 'react-native';
import icon from './assets/ticket.png';
import TicketStart from './TicketStart/TicketStart';
import type { Ticket } from '../../../services/tickets/types';

const ticket: Ticket = {
  checkedIn: false,
  email: 'bob@bobinator.net',
  firstName: 'Bob',
  lastName: 'Bobinator',
  identifier: '112233445566778899',
  orderId: 'fecfaf8a36',
  ticketType: 'Early Bird Ticket + Ball',
  ticketTypeId: 12,
  void: false,
};

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Ticket',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 28, height: 28, tintColor }}
      />),
  }

  goToEnterView = () => {
    const { navigation } = this.props;
    navigation.navigate('TicketEnter');
  }

  render() {
    return (
      <View>
        <TicketStart onTicketButtonClick={this.goToEnterView} />
      </View>);
  }
}
