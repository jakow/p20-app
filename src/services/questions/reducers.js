import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS, QUESTIONS_ERROR, TOGGLE_FAVOURITE } from './constants';

const initialState = {
  questions: [],
  favourites: new Set(),
  fetching: true,
  error: true,
};

export default function questions(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return { ...state, fetching: true, error: false };
    case RECEIVE_QUESTIONS:
      return { ...action.payload, fetching: false, error: false };
    case QUESTIONS_ERROR:
      return { ...state, error: true, fetching: false };
    default:
      return state;
  }
}
