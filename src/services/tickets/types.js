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
