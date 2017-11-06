// @flow
import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import icon from './assets/ticket.png';
import TicketEnterScreen from './TicketEnter/TicketEnterScreen';
import TicketViewOrStartScreen from './TicketViewOrStartScreen';

const TicketNavigator = StackNavigator({
  TicketViewOrStart: {
    screen: TicketViewOrStartScreen,
    header: null,
  },
  TicketEnter: {
    screen: TicketEnterScreen,
  },
}, {
  mode: 'modal',
});

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
