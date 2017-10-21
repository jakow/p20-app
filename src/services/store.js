import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import agenda from './agenda/reducers';

const rootReducer = combineReducers({
  agenda
})
export default createStore(
  rootReducer,
  applyMiddleware(thunk),
);
