/* @flow */

import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import icon from './assets/people.png';
import { safeAreaTop } from '../../../theme/native-base-theme/variables/commonColor';

const PeopleNavigator = StackNavigator({
  SpeakerList: {
    screen: SpeakerList,
  },
  SpeakerDetail: {
    screen: SpeakerDetail,
  }
}, {
  headerMode: 'screen',
  headerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default class PeopleScreen extends React.Component {
  static router = PeopleNavigator.router;
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 28, height: 25, tintColor }}
      />),
  }

  render() {
    return <PeopleNavigator navigation={this.props.navigation} />
  }
}
