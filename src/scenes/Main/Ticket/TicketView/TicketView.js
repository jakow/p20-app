// @flow

import React from 'react';
import { Text, View } from 'react-native';
import type { Ticket } from '../../../../services/tickets/types';

type TicketViewProps = {
  ticket: Ticket,
}

export default function TicketView({ ticket }: TicketViewProps) {
  return (
    <View>
      <Text>Your ticket</Text>
      <Text>{ticket.ticketType}</Text>
      <Text>{ticket.firstName}</Text>
      <Text>{ticket.lastName}</Text>
    </View>
  );
}
