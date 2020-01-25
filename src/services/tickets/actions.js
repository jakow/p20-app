// @flow
import { AsyncStorage, ToastAndroid, Platform, AlertIOS } from 'react-native';

import { TICKETS_ENDPOINT, ADD_TICKETS, UPDATE_FORM_DATA, SET_FORM_STATE, TICKETS_ERROR, RECEIVE_TICKETS, ERROR_TICKET, SUCCESS_TICKET, LOADING_TICKET } from './constants';
import type { FormState, Ticket } from './types';

const ERROR_DURATION = 3000;

const NOT_FOUND_MESSAGE = 'No ticket with matching information found in the database. Please check if the data is correct and if the problem persists, contact us.';
const NETWORK_ERROR_MESSAGE = 'It was not possible to connect to server.';

export default function updateData(payload: $Shape<FormState>) {
  return {
    type: UPDATE_FORM_DATA,
    payload,
  };
}

export function showError(error: string) {
  return (dispatch: (action: any) => void) => {
    dispatch({
      type: SET_FORM_STATE,
      payload: { error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_FORM_STATE,
        payload: { error: '' },
      });
    }, ERROR_DURATION);
  };
}

export function loading(loadingState: boolean) {
  return {
    type: SET_FORM_STATE,
    payload: { loading: loadingState },
  };
}

function addTickets(tickets: Ticket[]) {
  return {
    type: ADD_TICKETS,
    payload: tickets,
  };
}

export async function getTicketsFromStorage(storage: AsyncStorage = AsyncStorage) {
  const ticketsJson = await storage.getItem('tickets');
  if (!ticketsJson) {
    return [];
  }
  return (JSON.parse(ticketsJson): Ticket[]);
}

export function restoreTicketsFromStorage(storage: AsyncStorage = AsyncStorage) {
  return async (dispatch: (action: any) => void) => {
    dispatch(loading(true));
    const tickets = await getTicketsFromStorage(storage);
    dispatch(addTickets(tickets));
    dispatch(loading(false));
  };
}

export async function persistTicketToStorage(ticket: Ticket, storage: AsyncStorage = AsyncStorage) {
  const tickets: Ticket[] = await getTicketsFromStorage(storage);
  if (tickets.find(t => t.identifier === ticket.identifier)) {
    return null;
  }
  tickets.push(ticket);
  return storage.setItem('tickets', JSON.stringify(tickets));
}

export function findTicket(onSuccess?: () => void, onFailure?: (reason: string) => void) {
  return async (dispatch: (action: any) => void, getState: () => any) => {
    dispatch(loading(true));
    const { email, ticketId }  = getState().ticketForm;
    const form = JSON.stringify({
      email: email,
      code: ticketId,
    });
    try {
      const response = await fetch(`${TICKETS_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: form,
      });
      if (!response.ok) {
        const message = NOT_FOUND_MESSAGE;
        dispatch(showError(message));
        if (onFailure) {
          onFailure(message);
        }
        return;
      }

      const ticket = {
        email: email,
        identifier: ticketId,
      };

      dispatch(addTickets([ticket]));
      persistTicketToStorage(ticket);
      dispatch(updateData({ ticketId: '', email: '' }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      const message = NETWORK_ERROR_MESSAGE;
      if (onFailure) {
        onFailure(message);
      }
      dispatch(showError(message));
    } finally {
      dispatch(loading(false));
    }
  };
}

export function fetchTickets() {

  return async (dispatch) => {
    let ticketObjects = [];
    try {
      ticketsObjects = await Promise.all([
        getTicketsFromStorage(),
      ]);

    } catch (e) {
      if (ticketObjects == []) {
        dispatch({
          type: TICKETS_ERROR,
          payload: {},
        });
      }
    } finally {
      dispatch({
        type: RECEIVE_TICKETS,
        payload: {tickets: ticketsObjects},
      });
    }
  };
}

type TicketAvailability = {
  available: boolean,
  url?: string,
}

export async function getTicketAvailability(): Promise<TicketAvailability> {
  return fetch(`${TICKETS_ENDPOINT}/availability`).then(r => r.json());
}
