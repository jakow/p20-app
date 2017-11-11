// @flow
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TicketEnterForm from './TicketEnterForm';
import style from './style';

type TicketEnterProps = {
  showError: boolean,
  showLoading: boolean,
}

export default function TicketEnter(props: TicketEnterProps) {
  return (
    <KeyboardAwareScrollView style={style.ticketEnterContainer}>
      <TicketEnterForm />
    </KeyboardAwareScrollView>
  );
}
