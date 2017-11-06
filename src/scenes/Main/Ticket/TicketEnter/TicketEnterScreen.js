// @flow
import React from 'react';
import { Alert } from 'react-native';
import TicketEnter from './TicketEnter';
import TicketEnterNextButton from './TicketEnterNextButton';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import { white, primaryColor } from '../../../../theme/colors';

export default function TicketEnterScreen({ navigation }) {
  return (
    <TicketEnter
      onFormValidityUpdate={valid => navigation.setParams({ valid })}
    />
  );
}

function alertFailure(message: string) {
  Alert.alert(
    'Unable to fetch your ticket',
    message,
  );
}

TicketEnterScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: white,
  },
  headerTitle: 'Enter ticket details',
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
  headerRight: (<TicketEnterNextButton
    onSuccess={() => navigation.navigate('TicketViewOrStart')}
    onFailure={alertFailure}
  />),
});
