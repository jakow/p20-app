import React from 'react';
import TicketStart from './TicketStart';

export default function TicketStartScreen({ navigation }) {
  return (
    <TicketStart
      onTicketAvailable={() => navigation.navigate('TicketEnter')}
    />
  );
}

TicketStartScreen.navigationOptions = {
  header: null,
};
