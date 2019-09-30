// @flow
/* eslint-disable no-param-reassign */

import moment from 'moment';
import type { AgendaDay } from './types';

export function parseDates(agenda: AgendaDay[]) {
  agenda.forEach((day) => {

    day.date = new Date(day.date);
    day.events.forEach((ev) => {
      if (ev.time && ev.time.start) {
        ev.time.start = new Date(ev.time.start);
      }
      if (ev.time && ev.time.end) {
        ev.time.end = new Date(ev.time.end);
      }
    });
  });
  return agenda;
}

/**
 * Normalize agenda events for fast lookup by id
 */

export function sortArray(data){
  for(i = 0; i<data.agenda.length; i++)
  {
    data.agenda[i].events.sort(function (a, b) {
        var t1 = new Date(a.time.start);
        var t2 = new Date(b.time.start);
        return t1.getTime() > t2.getTime();
    })
  }
  return data;
}

export function normalizeData(agenda: any) {
  const days = agenda.agenda;
  const events = {};
  for (const d of days) {
    for (const e of d.events) {
      events[e._id] = e;
    }
  }
  return { ...agenda, events };
}


export function formatEventTime(start: Date, end: Date) {
  if (!start || !end) {
    return 'TBA';
  }
  const startTime = moment(start).utc().format('HH:mm');
  const endTime = moment(end).utc().format('HH:mm');
  if (start != null && end != null) {
    return `${startTime}—${endTime}`;
  } else if (start != null) {
    return `${startTime}—onwards`;
  } else if (end != null) {
    return `Until ${endTime}`;
  }
  return 'TBA';
}
