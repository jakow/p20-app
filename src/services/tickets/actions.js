// @flow
import { AsyncStorage } from 'react-native';
import { TICKETS_ENDPOINT, ADD_TICKETS, UPDATE_FORM_DATA, SET_FORM_STATE } from './constants';
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
    console.log('restoreTicketsFromStorage');
    const tickets = await getTicketsFromStorage(storage);
    console.log(tickets);
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
    const formState = getState().ticketForm;
    const form = JSON.stringify({ email: formState.email, identifier: formState.ticketId });
    try {
      const response = await fetch(`${TICKETS_ENDPOINT}/validate`, {
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

      const ticket: Ticket = await response.json();
      const currentTickets: Ticket[] = getState().tickets;
      if (!currentTickets.find(t => t.identifier === ticket.identifier)) {
        dispatch(addTickets([ticket]));
      }
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
