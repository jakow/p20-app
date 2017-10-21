import { REQUEST_AGENDA, RECEIVE_AGENDA, AGENDA_ERROR } from './constants';
import parseDates from './utils';

const AGENDA_ENDPOINT = 'https://www.poland20.com/api/agenda';

export default function fetchAgenda() {
  return async (dispatch) => {
    dispatch({ type: REQUEST_AGENDA });
    try {
      const agenda = await fetch(AGENDA_ENDPOINT).then(r => r.json());
      dispatch({
        type: RECEIVE_AGENDA,
        payload: {
          ...agenda, agenda: parseDates(agenda.agenda),
        },
      });
    } catch (e) {
      dispatch({ type: AGENDA_ERROR });
    }
  };
}
