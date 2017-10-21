import { REQUEST_AGENDA, RECEIVE_AGENDA, AGENDA_ERROR } from './constants';

const initialState = {
  agenda: [],
  venues: {},
  categories: {},
  fetching: true,
  error: true,
};

export default function agenda(state = initialState, action) {
  switch (action.type) {
    case REQUEST_AGENDA:
      return { ...state, fetching: true, error: false };
    case RECEIVE_AGENDA:
      return { ...action.payload, fetching: false, error: false };
    case AGENDA_ERROR:
      return { ...state, error: true, fetching: false };
    default:
      return state;
  }
}
