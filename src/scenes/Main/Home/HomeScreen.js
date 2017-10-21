/* @flow */

import React from 'react';
import { View, Image } from 'react-native';
import icon from './assets/home.png';
import ViewHeader from '../../../components/ViewHeader';

export default class AgendaScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 28, height: 28, tintColor }}
      />),
  }

  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <ViewHeader text="Home" />
      </View>);
  }
}
