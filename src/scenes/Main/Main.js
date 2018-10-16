// @flow
import React from 'react';
import { PermissionsAndroid, StatusBar, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
// import HomeScreen from './Home/HomeScreen';
import AgendaScreen from './Agenda/AgendaScreen';
import PeopleScreen from './People/PeopleScreen';
import EmpowerPLScreen from './EmpowerPL/EmpowerPLScreen';
import LocationScreen from './Navigation/NavigationScreen';
import TeamScreen from './Team/TeamScreen';
import TicketScreen from './Ticket/TicketScreen';
import { white, primaryColor, secondaryColor } from '../../theme/colors';
import { tabBarLabel } from './style';
import { safeAreaBottom } from '../../theme/native-base-theme/variables/commonColor';

import {Platform, StyleSheet} from 'react-native';

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
  Location:{
    screen: LocationScreen,
  },
  Ticket: {
    screen: TicketScreen,
  },
  Team: {
    screen: TeamScreen,
  },
  EmpowerPL: {
    screen: EmpowerPLScreen,
  }
}, {
  animationEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: primaryColor,
    inactiveTintColor: secondaryColor,
    labelStyle: tabBarLabel,
    style: {
      backgroundColor: white,
      ...Platform.select({
        android: {
          marginTop: 30,
          height: 49
        },
        ios: {
          height: 49 + safeAreaBottom
        }
      }),
      // alignItems: 'flex-start',
    },
    tabStyle: {
      height: 48,
      width: 110,
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
