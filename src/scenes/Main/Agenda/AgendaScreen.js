/* @flow */

import React from 'react';
import { AsyncStorage, Text, View, Image, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Spinner } from 'native-base';
import AgendaListScreen from './AgendaList/AgendaListScreen';
import AgendaDetailScreen from './AgendaDetail/AgendaDetailScreen';
import ViewHeader from '../../../components/ViewHeader';

import { primaryColor, mediumGray } from '../../../theme/colors';
import typography from '../../../theme/typography';
import style from './style';
import icon from './assets/list.png';

function renderLoading() {
  return (
    <View style={style.normalHeader}>
      <ViewHeader text="Agenda" />
      <Spinner color={Platform.OS === 'ios' ? mediumGray : primaryColor} />
    </View>
  );
}

function renderError() {
  return (
    <View style={style.normalHeader}>
      <ViewHeader text="Agenda" />
      <Text style={typography.body}>Agenda cannot be displayed at this time.</Text>
    </View>
  );
}
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

  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.loadAgenda();
  }

  async getAgendaFromLocalStorage() {
    try {
      const agendaBlob = await AsyncStorage.getItem('agenda');
      const agenda = JSON.parse(agendaBlob);
      this.setState({ agenda, loading: false });
    } catch (e) {
      this.setState({ loading: false, error: true });
    }
  }

  loadAgenda = async () => {
    try {
      this.setState({ refreshing: true });
      const agenda = await fetch(AGENDA_ENDPOINT).then(r => r.json());
      this.setState({ agenda, loading: false });
      AsyncStorage.setItem('agenda', JSON.stringify(agenda));
    } catch (e) {
      // if failed due to network error then we fall back to async storage agenda
      this.getAgendaFromLocalStorage();
    } finally {
      this.setState({ refreshing: false });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <View style={style.container}>
          { renderError() }
        </View>
      );
    }

    if (this.state.loading) {
      return (
        <View style={style.container}>
          { renderLoading() }
        </View>
      );
    }

    return <AgendaNavigator />
  }
}
