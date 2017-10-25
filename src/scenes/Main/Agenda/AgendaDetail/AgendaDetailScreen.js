// @flow

import React from 'react';
import AgendaDetail from './AgendaDetail';
import { primaryColor, white } from '../../../../theme/colors';
import HeaderBackButton from '../../../../components/HeaderBackButton';

export default class AgendaDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: white,
    },
    headerTitle: 'Event details',
    headerTitleStyle: {
      fontFamily: 'Source Sans Pro',
    },
    headerLeft: (
      <HeaderBackButton
        title="Back"
        color={primaryColor}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  render() {
    const eventId = this.props.navigation.state.params.id;
    return (
      <AgendaDetail eventId={eventId} />
    );
  }
}
