// @flow
import React from 'react';
import { PermissionsAndroid, StatusBar, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
// import HomeScreen from './Home/HomeScreen';
import AgendaScreen from './Agenda/AgendaScreen';
import PeopleScreen from './People/PeopleScreen';
import EmpowerPLScreen from './EmpowerPL/EmpowerPLScreen';
import LocationScreen from './Navigation/NavigationScreen';
import TeamScreen from './Team/TeamScreen';
import TicketScreen from './Ticket/TicketScreen';
import { white, primaryColor, secondaryColor, lightGray, mediumGray, newPink} from '../../theme/colors';
import { tabBarLabel } from './style';
import { safeAreaBottom } from '../../theme/native-base-theme/variables/commonColor';

import {Platform, StyleSheet} from 'react-native';
import QuestionsScreen from './Questions/QuestionsScreen';
import { gray } from 'ansi-colors';

const TabsNavigator = createBottomTabNavigator({
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
  },
  // Questions: {
  //   screen: QuestionsScreen,
  // }
}, {
  animationEnabled: true,
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: white,
    inactiveTintColor: mediumGray,
    labelStyle: tabBarLabel,
    style: {
      elevation: 5,
      shadowColor: '#000000',
      shadowOffset: { height: 5 }, 
      shadowOpacity: 0.75,
      shadowRadius: 5,
      backgroundColor: primaryColor,
      ...Platform.select({
        android: {
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

const Tabs = createAppContainer(TabsNavigator);

export default function Main() {
  return (
    <View style={{ flex: 1, backgroundColor: newPink }}>
      <StatusBar barStyle="dark-content" />
      <Tabs />
    </View>
  );
}
