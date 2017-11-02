import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import agenda from './agenda/reducers';
import ticketForm from './tickets/reducers';

const rootReducer = combineReducers({
  agenda,
  ticketForm,
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk),
);
