import { AsyncStorage, ToastAndroid, Platform, AlertIOS } from 'react-native';
import { keyBy } from 'lodash';
import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS, QUESTIONS_ERROR, TOGGLE_FAVOURITE } from './constants';
import { parseDates, normalizeData, sortArray } from '../agenda/utils';

const QUESTIONS_ENDPOINT = 'https://www.poland20.com/api/questions';

export async function getQuetionsFromEndpoint() {
  const result = await fetch(QUESTIONS_ENDPOINT).then(r => r.json());
  return result;
}

export async function sendQuestionToServer(data){
  try {
    const form = JSON.stringify({askedBy: data.askedBy, text: data.text, forEvent: data.forEvent});
    const response = await fetch(QUESTIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: form,
    });

    if (!response.ok) {
      ToastAndroid.show("Error sending question", ToastAndroid.SHORT)
      return false;
    }

  } catch(e){
    ToastAndroid.show("Error sending question", ToastAndroid.SHORT)
    return false;
  } finally{
    if(Platform.OS === 'ios')
    {
        AlertIOS.alert('Question sent','Question has been sent to server. Wait for acceptance')
    }
    else
    {
        ToastAndroid.show("Question was asked", ToastAndroid.SHORT)
    }
    return true;
  }
}

export default function fetchQuestions() {
  return async (dispatch) => {
    try {
      const [questionsArray] = await Promise.all([
        getQuetionsFromEndpoint(),
      ]);
      questions = {
        questions: questionsArray,
      };
    } catch (e) {
      if (questions == null) {
        dispatch({
          type: QUESTIONS_ERROR,
          payload: {},
        });
      }
    } finally {
      dispatch({
        type: RECEIVE_QUESTIONS,
        payload: questions,
      });
    }
  };
}
