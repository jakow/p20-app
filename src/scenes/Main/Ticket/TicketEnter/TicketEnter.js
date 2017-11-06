// @flow
import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import TicketEnterForm from './TicketEnterForm';
import style from './style';

type TicketEnterProps = {
  showError: boolean,
  showLoading: boolean,
}

export default function TicketEnter(props: TicketEnterProps) {
  return (
    <KeyboardAvoidingView style={style.ticketEnterContainer}>
      <ScrollView>
        <TicketEnterForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
