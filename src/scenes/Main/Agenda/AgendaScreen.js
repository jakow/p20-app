/* @flow */

import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AgendaListScreen from './AgendaList/AgendaListScreen';
import AgendaDetailScreen from './AgendaDetail/AgendaDetailScreen';
import QuestionsScreen from '../Questions/QuestionsScreen';
import QuestionsAsk from '../Questions/QuestionsAsk';
import { safeAreaTop } from '../../../theme/native-base-theme/variables/commonColor';
import icon from './assets/list.png';

const AgendaNavigator = createStackNavigator({
  List: {
    screen: AgendaListScreen,
  },
  Detail: {
    screen: AgendaDetailScreen,
  },
  Questions:{
    screen: QuestionsScreen,
  },
  QuestionsAsk:{
    screen: QuestionsAsk,
  },
}, {
  headerMode: 'screen',
});

export default class AgendaScreen extends React.Component {
  static router = AgendaNavigator.router;
  static navigationOptions = {
    tabBarLabel: 'Agenda',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 27, height: 27, tintColor }}
      />),
  }

  render() {
    return <AgendaNavigator navigation={this.props.navigation} />;
  }
}
