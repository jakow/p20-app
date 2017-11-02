import React from 'react';
import { Button, Text } from 'native-base';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import HeaderRightButton from '../../../../components/HeaderRightButton';
import TicketEnter from './TicketEnter';
import { white, primaryColor } from '../../../../theme/colors';

export default function TicketEnterScreen({ navigation }) {
  return (
    <TicketEnter
      onFormValidityUpdate={valid => navigation.setParams({ valid })}
    />
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
  headerRight: (
    <HeaderRightButton
      title="Next"
      color={navigation.state.params && navigation.state.params.valid ? primaryColor : '#bcbcbc'}
    />
  ),
});
