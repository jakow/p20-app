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

export type AgendaEventCategory = {
  name: string;
  color: string;
} & DbEntry;

export type AgendaEvent = {
  name: string;
  type: string;
  description: string;
  category: AgendaEventCategory;
  startTime: string;
  endTime: string;
  speakers: Speaker[];
} & DbEntry;

export type AgendaDay = {
  name: string;
  date?: string;
  description: string;
  venue: Venue;
  events: AgendaEvent[];
  edition?: Edition;
} & DbEntry;
z

export type Speaker = {
  name: string;
    occupation?: string;
    organisation: string;
    photo: CloudinaryPhoto;
    description?: string;
    category?: string;
    agendaEvents?: AgendaEvent[];
} & DbEntry;

export type TeamMember = {
  ame: string;
    position: string;
    organisation: string;
    photo: CloudinaryPhoto;
    description: string;
    email: string;
    linkedin: string;
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
