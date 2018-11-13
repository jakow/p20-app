import { AsyncStorage, ToastAndroid } from 'react-native';
import { keyBy } from 'lodash';
import { REQUEST_AGENDA, RECEIVE_AGENDA, AGENDA_ERROR, TOGGLE_FAVOURITE } from './constants';
import { parseDates, normalizeData, sortArray } from './utils';

const AGENDA_ENDPOINT = 'https://www.poland20.com/api/agenda';
const SPEAKERS_ENDPOINT = 'https://www.poland20.com/api/speakers';
const TEAM_MEMBERS_ENDPOINT = 'https://www.poland20.com/api/teamMembers';

export async function getAgendaFromEndpoint() {
  const result = await fetch(AGENDA_ENDPOINT).then(r => r.json());
  parseDates(result.agenda);
  sortArray(result);
  return result;//result;
}

export async function getTeamMembersFromEndpoint() {
  const result = fetch(TEAM_MEMBERS_ENDPOINT).then(r => r.json());
  return result;
}

export async function getSpeakersFromEndpoint() {
  return fetch(SPEAKERS_ENDPOINT).then(r => r.json());
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
  let agenda;
  // let questions = {
  //   "_id": "000",
  //     "slug": "Questions",
  //     "name": "Questions",
  //     "__v": 0,
  //     //"agendaDay": "5bcdb07cd3418875eb8286e7",
  //     //"category": "59e7445f9118553b77a01ab5",
  //     "description": "TBA",
  //     //"edition": "5b560ef250d0c067c23f65d2",
  //     "type": "Questions",
  //     "speakers": [ ],
  //     "time": {
  //     "end": "2018-11-24T17:00:00.000Z",
  //     "start": "2018-11-24T09:00:00.000Z"
  //   }};
  return async (dispatch) => {
    try {
      const [agendaObject, speakerArray, teamMembersArray] = await Promise.all([
        getAgendaFromEndpoint(),
        getSpeakersFromEndpoint(),
        getTeamMembersFromEndpoint(),
      ]);
      // parse dates in the 'days' array and extract events to own event dict
      // if(agendaObject.agenda != [])
      // {
      //   // agendaObject.agenda[0].events.push(questions);
      // }
      agenda = normalizeData({
        ...agendaObject,
        agenda: parseDates(agendaObject.agenda),
        speakers: keyBy(speakerArray, '_id'),
        teamMembers: teamMembersArray,
      });

      sortArray(agenda);
    } catch (e) {
      agenda = await getAgendaFromLocalStorage(agenda);
      if (agenda == null) {
        ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
        dispatch({
          type: AGENDA_ERROR,
          payload: {},
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
