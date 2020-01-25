import { AsyncStorage, ToastAndroid } from 'react-native';
import { keyBy } from 'lodash';
import { REQUEST_AGENDA, RECEIVE_AGENDA, AGENDA_ERROR, TOGGLE_FAVOURITE } from './constants';
import { TICKETS_ENDPOINT } from '../tickets/constants'
import { parseDates, normalizeData, sortArray } from './utils';

const AGENDA_ENDPOINT = 'https://api.poland20.com/editions/current';

export async function getAgendaFromEndpoint() {
  const result = await fetch(AGENDA_ENDPOINT).then(r => r.json());
  return result;
}

export async function getTicketsFromEndpoint() {
  const result = await fetch(TICKETS_ENDPOINT).then(r => r.json());
  return result;
}

export function storeAgendaInLocalStorage(agenda) {
  AsyncStorage.setItem('agenda', JSON.stringify(agenda));
}

export async function getFavourites() {
  return await AsyncStorage.getItem('agendaFavourites') || [];
}

export function getAgendaFromLocalStorage() {
  return AsyncStorage.getItem('agenda');
}

export function toggleFavourite(id) {
  return {
    action: TOGGLE_FAVOURITE,
    payload: id,
  };
}

export default function fetchAgenda() {
  let dataNew;

  return async (dispatch) => {
    try {
      const [agendaObject, Tickets] = await Promise.all([
        getAgendaFromEndpoint(),
        getTicketsFromEndpoint(),
      ]);
      
      dataNew = {
        agenda: agendaObject,
        tickets: Tickets,
      };

      AsyncStorage.setItem('agenda', JSON.stringify(dataNew));

    } catch (e) {
      dataNew = await AsyncStorage.getItem('agenda');
      dataNew = JSON.parse(dataNew)
      if (dataNew == null) {
        dispatch({
          type: AGENDA_ERROR,
          payload: {},
        });
      }
    } finally {
      dispatch({
        type: RECEIVE_AGENDA,
        payload: dataNew,
      });
    }
  };
}
