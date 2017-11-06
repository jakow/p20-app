// @flow
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import QrCode from 'react-native-qrcode-svg';

import type { Ticket } from '../../../../services/tickets/types';
import typography from '../../../../theme/typography';
import style from './style';
import logo from '../../../../assets/logo.png';

type TicketImageProps = {
  ticket: Ticket,
};

const { height: deviceHeight } = Dimensions.get('window');

export default function TicketImage({ ticket }: TicketImageProps) {

  return (
    <View style={style.ticket}>
      <View style={[style.ticketNotch, style.ticketNotchTop]} />
      <View style={[style.ticketNotch, style.ticketNotchBottom]} />
      <QrCode
        value={ticket.identifier}
        size={deviceHeight > 600 ? 200 : 120}
        logo={logo}
        ecl="H"
      />

      <View style={style.ticketField}>
        <Text style={[typography.small, style.ticketFieldName]}>Ticket type</Text>
        <Text style={[typography.title3, style.ticketFieldValue]}>{ticket.ticketType}</Text>
      </View>
      <View style={style.ticketField}>
        <Text style={[typography.small, style.ticketFieldName]}>Attendee</Text>
        <Text style={[typography.title3, style.ticketFieldValue]}>{`${ticket.firstName} ${ticket.lastName}`}</Text>
        <Text style={[typography.small, style.ticketFieldValue]}>{ticket.email}</Text>
      </View>

      <View style={[style.ticketField, style.ticketTable]}>
        <View style={style.ticketTableRow}>
          <Text style={[typography.small, style.ticketRowName]}>
            Ticket ID
          </Text>
          <Text style={[typography.small, style.ticketRowValue]}>
            {ticket.identifier}
          </Text>
        </View>
        <View style={style.ticketTableRow}>
          <Text style={[typography.small, style.ticketRowName]}>
            Order ID
          </Text>
          <Text style={[typography.small, style.ticketRowValue]}>
            {ticket.orderId}
          </Text>
        </View>
      </View>
    </View>
  );
}
