// @flow
import { UPDATE_TICKET_FORM_DATA } from './constants';

export default function updateData(payload: $Shape<FormData>) {
  return {
    type: UPDATE_TICKET_FORM_DATA,
    payload,
  };
}
