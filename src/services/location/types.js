// @flow
export type LngLat = [number, number];

export type Location = {
  name: string, // building name
  number: string, // unit or shop number
  street1: string, // street address
  street2: string, // street address line 2
  suburb: string,
  state: string,
  postcode: string,
  country: string,
  geo: LngLat, // longitude, latitude
};
