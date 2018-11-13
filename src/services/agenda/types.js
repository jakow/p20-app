// @flow
import type { DbEntry, Id } from '../dbTypes';
import type { Location } from '../location/types';

export type Image = {
  secure_url: string;
}

export type Venue = {
  name: string,
  location: Location,
} & DbEntry;

export type AgendaEvent = {
  name: string,
  type: string,
  image?: Image,
  description?: string,
  time?: {
    start?: Date,
    end?: Date,
  },
  speakers: Id[],
  agendaDay: Id,
  venue?: Venue,
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

export type Speaker = {
  name: string;
  speakerCategory: Id,
  position: string;
  company: string;
  photo: { secure_url: string },
  description: string,
  edition: Id[],
} & DbEntry;

export type TeamMember = {
  name: string,
  email: string,
  occupation: string,
  linkedin: string,
  position: string,
  photo: { secure_url: string },
  description: string,
  edition: Id[],
  sortOrder: string,
} & DbEntry;

export type endQuestions = {
  text: string,
  askedBy: string,
  forEvent: Id,
  toPerson: Id,
  dateCreated: Date,
  accepted: boolean,
  dateAccepted: Date,
  archived: boolean,
} & DbEntry;
