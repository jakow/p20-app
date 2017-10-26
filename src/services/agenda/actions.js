import { AsyncStorage } from 'react-native';
import { keyBy } from 'lodash';
import { REQUEST_AGENDA, RECEIVE_AGENDA, AGENDA_ERROR } from './constants';
import { parseDates, normalizeData } from './utils';

const AGENDA_ENDPOINT = 'https://www.poland20.com/api/agenda';
const SPEAKERS_ENDPOINT = 'https://www.poland20.com/api/speakers';

export async function getAgendaFromEndpoint() {
  const result = await fetch(AGENDA_ENDPOINT).then(r => r.json());
  parseDates(result.agenda);
  return result;
}

export function getSpeakersFromEndpoint() {
  return fetch(SPEAKERS_ENDPOINT).then(r => r.json());
}

export function storeAgendaInLocalStorage(agenda) {
  AsyncStorage.setItem('agenda', JSON.stringify(agenda));
}

export function getAgendaFromLocalStorage() {
  return AsyncStorage.getItem('agenda');
}

export default function fetchAgenda() {
  let agenda;
  return async (dispatch) => {
    try {
      const [agendaObject, speakerArray] = await Promise.all([
        getAgendaFromEndpoint(),
        getSpeakersFromEndpoint(),
      ]);
      // parse dates in the 'days' array and extract events to own event dict
      agenda = normalizeData({
        ...agendaObject,
        agenda: parseDates(agendaObject.agenda),
        speakers: keyBy(speakerArray, '_id'),
      });
      console.log(agenda);
    } catch (e) {
      agenda = await getAgendaFromLocalStorage(agenda);
      if (agenda == null) {
        dispatch({
          type: AGENDA_ERROR,
        });
      }
    } finally {
      dispatch({
        type: RECEIVE_AGENDA,
        payload: agenda,
      });
    }
  };
}
