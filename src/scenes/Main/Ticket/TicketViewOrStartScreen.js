// @flow
import React from 'react';
import { connect } from 'react-redux';
import TicketStart from './TicketStart/TicketStart';
import TicketView from './TicketView/TicketView';
import type { Ticket } from '../../../services/tickets/types';

type Props = {
  tickets: Ticket[],
  navigation: any,
};

function TicketViewOrStartScreen({ navigation, tickets }: Props) {
  const openTicketEnter = () => {
    navigation.navigate('TicketEnter');
  };

  const openTicketGet = () => {
    navigation.navigate('TicketGet');
  }

  return (
    tickets.length > 0 ?
      (
        <TicketView onTicketAdd={openTicketEnter} />
      ) : (
        <TicketStart
          onTicketAdd={openTicketEnter}
          onTicketGet={openTicketGet}
        />
      )
  );
}

TicketViewOrStartScreen.navigationOptions = {
  header: null,
};

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
  };
}

export default connect(mapStateToProps)(TicketViewOrStartScreen);
