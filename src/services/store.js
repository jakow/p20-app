// @flow
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import agenda from './agenda/reducers';
import { ticketFormReducer, ticketsReducer } from './tickets/reducers';

const rootReducer = combineReducers({
  agenda,
  ticketForm: ticketFormReducer,
  tickets: ticketsReducer,
});

export default (preloadedState: any = {}) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk),
);
