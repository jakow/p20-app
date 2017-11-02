import { REQUEST_AGENDA, RECEIVE_AGENDA, AGENDA_ERROR, TOGGLE_FAVOURITE } from './constants';

const initialState = {
  agenda: [],
  events: {},
  venues: {},
  categories: {},
  speakers: {},
  favourites: new Set(),
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
    case TOGGLE_FAVOURITE:
      if (state.favourites.has(action.payload)) {
        state.favourites.delete(action.payload);
      } else {
        state.favourites.add(action.payload);
      }
      return { ...state, favourites: new Set(state.favourites) };
    default:
      return state;
  }
}
