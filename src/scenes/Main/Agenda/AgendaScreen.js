/* @flow */

import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AgendaListScreen from './AgendaList/AgendaListScreen';
import AgendaDetailScreen from './AgendaDetail/AgendaDetailScreen';

import icon from './assets/list.png';

const AgendaNavigator = StackNavigator({
  List: {
    screen: AgendaListScreen,
  },
  Detail: {
    screen: AgendaDetailScreen,
  },
}, {
  headerMode: 'screen',
});

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
    return <AgendaNavigator />
  }
}
