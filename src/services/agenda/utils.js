// @flow

import type { AgendaDay } from './types';

export default function parseDates(agenda: AgendaDay[]) {
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
