import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TeamList from './TeamList';
import TeamDetail from './TeamDetail';
import icon from './assets/team.png';
import { safeAreaTop } from '../../../theme/native-base-theme/variables/commonColor';

const TeamNavigator = createStackNavigator({
  TeamList: {
    screen: TeamList,
  },
  TeamDetail: {
    screen: TeamDetail,
  }
}, {
  headerMode: 'screen',
});

export default class TeamScreen extends React.Component {
  static router = TeamNavigator.router;
  static navigationOptions = {
    tabBarLabel: 'Team',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 28, height: 25, tintColor }}
      />),
  }

  render() {
    return <TeamNavigator navigation={this.props.navigation} />
  }
}
