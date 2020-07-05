import { ActionTypes, IInitAppAction } from './types';

export const initAppStart = (payload): IInitAppAction => ({
  type: ActionTypes.INIT_APP_START,
  payload
});
