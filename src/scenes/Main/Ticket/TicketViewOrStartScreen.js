// @flow
import React from 'react';
import { connect } from 'react-redux';
import TicketStart from './TicketStart/TicketStart';
import TicketView from './TicketView/TicketView';
import type { Ticket } from '../../../services/tickets/types';
import AppLink from 'react-native-app-link';

type Props = {
  tickets: Ticket[],
  navigation: any,
};

function TicketViewOrStartScreen({ navigation, tickets }: Props) {
  const openTicketEnter = () => {
    /*
      Tutaj jest link który stworzył Jakub gdzie użytkownik mógł przetrzymywać bilet
      do tego było specjalny endpoind api.poland20.com/tickets ale nie był używany w 2018 edycji
      początkowo używany był ticketbase ale strona nie działała i przerzuciliśmy się na eventbrite
      dlatego używamy ich aplikacji. Jeśli chcecie używać poprzedniego api, po prostu odkomentuj poniższą linie kodu
    */
    // navigation.navigate('TicketEnter');
    /* wtedy możesz to okomentować */
    const url = "Eventbrite://"
    const appName = "Eventbrite";
    const appStoreId = "487922291";
    const appStoreLocale = "uk"
    const playStoreId = "com.eventbrite.attendee"
    AppLink.maybeOpenURL(url, { appName, appStoreId, appStoreLocale, playStoreId }).then(() => {
      // do stuff
    })
    .catch((err) => {
      // handle error
    });
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
