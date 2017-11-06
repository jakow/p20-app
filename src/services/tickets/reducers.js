// @flow
import {
  ADD_TICKETS,
  UPDATE_FORM_DATA,
  SET_FORM_STATE,
  VALID_EMAIL,
  VALID_CODE_REGEX,
} from './constants';
import type { Action } from '../types';
import type { FormState, Ticket } from './types';

export function ticketFormReducer(
  formState: FormState = {
    email: '',
    ticketId: '',
    valid: false,
    error: '',
    loading: false,
  },
  action: Action<any>,
) {
  let newState;
  switch (action.type) {
    case UPDATE_FORM_DATA:
      newState = Object.assign({}, formState, action.payload);
      newState.valid = VALID_EMAIL.test(newState.email) && VALID_CODE_REGEX.test(newState.ticketId);
      return newState;
    case SET_FORM_STATE:
      return { ...formState, ...action.payload };
    default:
      return formState;
  }
}

export function ticketsReducer(
  ticketsState: Ticket[] = [],
  action: Action<Ticket[]>,
) {
  if (action.type !== ADD_TICKETS) {
    return ticketsState;
  }
  return [...ticketsState, ...action.payload];
}
