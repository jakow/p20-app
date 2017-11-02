// @flow

export type Action<PayloadType> = {
  type: string,
  payload: PayloadType,
};
