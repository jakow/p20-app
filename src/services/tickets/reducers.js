// @flow
import {
  ADD_TICKET,
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

const initialTicketsTemporaryPleaseRemove = [
  {
    checkedIn: false,
    email: 'bob@bobinator.net',
    firstName: 'Bob',
    lastName: 'Bobinator',
    identifier: '112233445566778899',
    orderId: 'fecfaf8a36',
    ticketType: 'Early Bird Ticket + Ball',
    ticketTypeId: 12,
    void: false,
  }, {
    checkedIn: false,
    email: 'john@johninator.net',
    firstName: 'John',
    lastName: 'Bobinator-With-Very-Long-Name',
    identifier: '112233445566778899',
    orderId: 'fecfaf8a36',
    ticketType: 'Conference + Ball',
    ticketTypeId: 12,
    void: false,
  },
];


export function ticketsReducer(
  ticketsState: Ticket[] = initialTicketsTemporaryPleaseRemove,
  action: Action<Ticket>
) {
  if (action.type !== ADD_TICKET) {
    return ticketsState;
  }
  return [...ticketsState, action.payload];
}
