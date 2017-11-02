/* @flow */

import React from 'react';
import { View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import icon from './assets/ticket.png';
import TicketStartScreen from './TicketStart/TicketStartScreen';
import TicketEnterScreen from './TicketEnter/TicketEnterScreen';
import TicketView from './TicketView/TicketView';
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

const TicketNavigator = StackNavigator({
  TicketStart: {
    screen: TicketStartScreen,
  },
  TicketEnter: {
    screen: TicketEnterScreen,
  },
  TicketView: {
    screen: TicketView,
  },
}, {
  headerMode: 'screen',
});

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
    return <TicketNavigator />;
  }
}
