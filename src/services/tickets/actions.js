// @flow
import { AsyncStorage } from 'react-native';
import { TICKETS_ENDPOINT, ADD_TICKET, UPDATE_FORM_DATA, SET_FORM_STATE } from './constants';
import type { FormState, Ticket } from './types';

const ERROR_DURATION = 3000;

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

function addTicket(ticket: Ticket) {
  return {
    type: ADD_TICKET,
    payload: ticket,
  };
}

export async function persistTicketToStorage(ticket: Ticket, storage: AsyncStorage = AsyncStorage) {
  const tickets: Ticket[] = JSON.parse(await storage.getItem('tickets') || []);
  if (tickets.find(t => t.identifier === ticket.identifier)) {
    return null;
  }
  tickets.push(ticket);
  return storage.setItem('tickets', JSON.stringify(tickets));
}

export function findTicket(onSuccess?: () => void) {
  return async (dispatch: (action: any) => void, getState: () => any) => {
    const form = getState().ticketForm;
    try {
      const response = await fetch(`${TICKETS_ENDPOINT}/`, {
        method: 'POST',
        body: JSON.stringify(form),
      });
      console.log(response);


      if (!response.ok) {
        dispatch(showError('No ticket found'));
        return;
      }

      const ticket: Ticket = await response.json();
      dispatch(addTicket(ticket));
      persistTicketToStorage(ticket);
      dispatch(updateData({ ticketId: '', email: '' }));
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      dispatch(showError('It was not possible to connect to server.'));
    }
  };
}
