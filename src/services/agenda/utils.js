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


export function formatEventTime(agendaTime?: {start?: Date, end?: Date}) {
  if (!agendaTime) {
    return 'TBA';
  }
  const { start, end } = agendaTime;
  const startTime = moment(start).format('HH:mm');
  const endTime = moment(end).format('HH:mm');
  if (start != null && end != null) {
    return `${startTime}—${endTime}`;
  } else if (start != null) {
    return `${startTime}—onwards`;
  } else if (end != null) {
    return `Until ${endTime}`;
  }
  return 'TBA';
}
