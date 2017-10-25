// @flow

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
export function normalizeData(agenda) {
  const days = agenda.agenda;
  const events = {};
  for (const d of days) {
    for (const e of d.events) {
      events[e._id] = e;
    }
  }
  return { ...agenda, events };
}
