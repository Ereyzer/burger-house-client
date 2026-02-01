import type { WorkingStatus } from './openState';

export type WarningMessages = {
  [key in WorkingStatus]: string;
};

export const WARNING_MESSAGES: WarningMessages = {
  NOT_OPENED: 'Ми ще не відкрилися',
  CLOSED: 'Ми зараз закриті',
};
