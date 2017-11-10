// @flow
import React from 'react';
import { StatusBar, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
// import HomeScreen from './Home/HomeScreen';
import AgendaScreen from './Agenda/AgendaScreen';
import PeopleScreen from './People/PeopleScreen';
import TicketScreen from './Ticket/TicketScreen';
import { white, primaryColor } from '../../theme/colors';
import { tabBarLabel } from './style';

const Tabs = TabNavigator({
  // Home: {
  //   screen: HomeScreen,
  // },
  Agenda: {
    screen: AgendaScreen,
  },
  People: {
    screen: PeopleScreen,
  },
  Ticket: {
    screen: TicketScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: primaryColor,
    labelStyle: tabBarLabel,
    style: {
      backgroundColor: white,
    },
    indicatorStyle: {
      backgroundColor: primaryColor,
    },
  },
});

export default function Main() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Tabs />
    </View>
  );
}
