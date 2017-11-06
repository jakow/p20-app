// @flow

export type Ticket = {
  identifier: string,
  orderId: string,
  firstName: string,
  lastName: string,
  email: string,
  checkedIn: boolean,
  void: boolean,
  ticketType: string,
  ticketTypeId: number,
}

export type FormState = {
  email: string,
  ticketId: string,
  valid: boolean,
  loading: false,
};
