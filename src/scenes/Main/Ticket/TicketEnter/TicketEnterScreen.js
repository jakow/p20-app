// @flow
import React from 'react';
import { Alert } from 'react-native';
import TicketEnter from './TicketEnter';
import TicketEnterNextButton from './TicketEnterNextButton';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import { white, primaryColor, newGreen } from '../../../../theme/colors';
import { safeAreaTop } from '../../../../theme/native-base-theme/variables/commonColor';

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
    backgroundColor: newGreen,
    height: 44 + safeAreaTop,
    paddingTop: safeAreaTop,
  },
  headerTitle: 'Enter ticket details',
  headerTitleStyle: {
    fontFamily: 'Source Sans Pro SemiBold',
    color: white
  },
  headerLeft: (
    <HeaderBackButton
      title="Back"
      color={white}
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (<TicketEnterNextButton
    onSuccess={() => navigation.navigate('TicketViewOrStart')}
    onFailure={alertFailure}
  />),
});
