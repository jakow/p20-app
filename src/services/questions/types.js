import type { DbEntry, Id } from '../dbTypes';


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

export type QuestionEvent = {
  askedBy: string,
  text: string,
  panel: String,
} & DbEntry;
