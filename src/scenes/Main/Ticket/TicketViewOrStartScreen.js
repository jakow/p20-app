// @flow
import React from 'react';
import { connect } from 'react-redux';
import {Linking} from 'react-native';
import TicketStart from './TicketStart/TicketStart';
import TicketView from './TicketView/TicketView';
import { getTicketsFromStorage } from '../../../services/tickets/actions';
import type { Ticket } from '../../../services/tickets/types';
// import AppLink from 'react-native-app-link';

type Props = {
  tickets: Ticket[],
  navigation: any,
};

function TicketViewOrStartScreen({ navigation, tickets, fetchTickets }: Props) {
  const openTicketEnter = () => {
    navigation.navigate('TicketEnter');
  };

  const openTicketGet = () => {
    //navigation.navigate('TicketGet');
    Linking.openURL('https://poland20.com/tickets')
  }

  const openEmail = (data) => {
    navigation.navigate('Email', {data: data});
  }

  const openSummary = (data) => {
    navigation.navigate('TicketSummary', {data: data});
  }

  return (
    tickets.length > 0 ?
      (
        <TicketView onTicketAdd={openTicketEnter} />
      ) : (
        <TicketStart
          onTicketAdd={openTicketEnter}
          onTicketGet={openTicketGet}
          onEmailStep={openEmail}
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
function mapDispatchToProps(dispatch) {
  return {
    fetchTickets: () => dispatch(getTicketsFromStorage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketViewOrStartScreen);
