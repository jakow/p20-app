// @flow

import React from 'react';
import AgendaDetail from './AgendaDetail';
import { primaryColor, white } from '../../../../theme/colors';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import { safeAreaTop } from '../../../../theme/native-base-theme/variables/commonColor';

export default class AgendaDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: white,
      paddingTop: safeAreaTop,
      height: 44 + safeAreaTop,
    },
    headerTitle: 'Event details',
    headerTitleStyle: {
      fontFamily: 'Source Sans Pro SemiBold',
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
