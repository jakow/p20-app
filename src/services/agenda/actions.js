import { AsyncStorage } from 'react-native';

import { REQUEST_AGENDA, RECEIVE_AGENDA, AGENDA_ERROR } from './constants';
import { parseDates, normalizeData } from './utils';

const AGENDA_ENDPOINT = 'https://www.poland20.com/api/agenda';

export async function getAgendaFromEndpoint() {
  const result = await fetch(AGENDA_ENDPOINT).then(r => r.json());
  parseDates(result.agenda);
  return result;
}

export async function getAgendaFromLocalStorage() {
  const agenda = JSON.parse(await AsyncStorage.getItem('agenda'));
  parseDates(agenda);
  return agenda;
}

export default function fetchAgenda() {
  return async (dispatch) => {
    let agendaObject;
    dispatch({ type: REQUEST_AGENDA });
    try {
      agendaObject = await getAgendaFromEndpoint();
      AsyncStorage.setItem('agenda', JSON.stringify(agendaObject));
    } catch (e) {
      agendaObject = await getAgendaFromLocalStorage();
      if (agendaObject == null) {
        agendaObject = {
          agenda: [],
          venues: {},
          categories: {},
        };
        dispatch({ type: AGENDA_ERROR });
      }
    } finally {
      dispatch({
        type: RECEIVE_AGENDA,
        payload: normalizeData(agendaObject),
      });
    }
  };
}
