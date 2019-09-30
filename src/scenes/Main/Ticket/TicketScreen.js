// @flow
import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import icon from './assets/ticket.png';
import TicketEnterScreen from './TicketEnter/TicketEnterScreen';
import TicketViewOrStartScreen from './TicketViewOrStartScreen';
import TicketGet from './TicketBuy/TicketGet';
import TicketEmail from './TicketBuy/TicketEmail/TicketEmail';
import TicketSummary from './TicketBuy/TicketSummary/TicketSummary';

const TicketNavigator = createAppContainer(createStackNavigator({
  TicketViewOrStart: {
    screen: TicketViewOrStartScreen,
    header: null,
  },
  TicketEnter: {
    screen: TicketEnterScreen,
  },
  TicketGet: {
    screen: TicketGet,
  },
  TicketEmails: {
    screen: TicketEmail,
  },
  TicketSummary: {
    screen: TicketSummary,
  }
}, {
  mode: 'modal',
}));

export default function TicketScreen() {
  return <TicketNavigator />;
}


TicketScreen.navigationOptions = {
  tabBarLabel: 'Ticket',
  tabBarIcon: ({ tintColor }: { tintColor: string }) => (
    <Image
      source={icon}
      style={{ width: 28, height: 28, tintColor }}
    />),
};
