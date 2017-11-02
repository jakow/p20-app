// @flow
import { UPDATE_TICKET_FORM_DATA, VALID_EMAIL, VALID_CODE_REGEX } from './constants';
import type { Action } from '../types';
import type { FormData } from './types';




const intialFormState: FormData = {
  email: '',
  ticketId: '',
  valid: false,
};

export default function ticketFormReducer(
  formState: FormData = intialFormState,
  action: Action<FormData>,
) {
  if (action.type !== UPDATE_TICKET_FORM_DATA) {
    return formState;
  }
  const newData = Object.assign({}, formState, action.payload);
  newData.valid = VALID_EMAIL.test(newData.email) && VALID_CODE_REGEX.test(newData.ticketId);
  return newData;
}
