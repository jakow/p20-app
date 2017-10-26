// @flow
import type { DbEntry, Id } from '../dbTypes';

export type AgendaEvent = {
  name: string,
  type: string,
  description?: string,
  time?: {
    start?: Date,
    end?: Date,
  },
  speakers?: Id[],
  agendaDay: Id,
  venue: Id,
  category: Id,
  edition: Id,
} & DbEntry;

export type AgendaEventCategory = {
  name: string;
  color: string;
} & DbEntry;

export type AgendaDay = {
  name: string,
  date: Date,
  events: AgendaEvent[],
  edition: Id,
  description: string,
} & DbEntry;


type LngLat = [number, number];

export type Venue = {
  name: string,
  location: {
    name: string, // building name
    number: string, // unit or shop number
    street1: string, // street address
    street2: string, // street address line 2
    suburb: string,
    state: string,
    postcode: string,
    country: string,
    geo: LngLat, // longitude, latitude
  }
} & DbEntry;

export type Speaker = {
  name: string;
  speakerCategory: Id,
  position: string;
  company: string;
  photo: { secure_url: string },
  description: string,
  edition: Id[],
} & DbEntry;
