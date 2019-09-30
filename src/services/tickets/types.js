// @flow

// export type Ticket = {
//   identifier: string,
//   orderId: string,
//   firstName: string,
//   lastName: string,
//   email: string,
//   checkedIn: boolean,
//   void: boolean,
//   ticketType: string,
//   ticketTypeId: number,
// }

export type Ticket = {
  id: string,
  active: boolean,
  name: string,
  description: string,
  price: number,
  quantity?: number,
  warningLimit?: number,
  soldRecently?: number,
  benefits?: string,
}

export type FormState = {
  email: string,
  ticketId: string,
  valid: boolean,
  loading: false,
};
