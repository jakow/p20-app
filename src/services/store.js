// @flow
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import agenda from './agenda/reducers';
import { ticketFormReducer, ticketsReducer } from './tickets/reducers';
import questions from './questions/reducers';

const rootReducer = combineReducers({
  agenda,
  questions,
  ticketForm: ticketFormReducer,
  tickets: ticketsReducer,
});

export default (preloadedState: any = {}) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk),
);
