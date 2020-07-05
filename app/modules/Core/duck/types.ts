import { NextPageContext } from 'next';

export enum ActionTypes {
  INIT_APP_START = '@@core/INIT_APP_START',
  INIT_APP_SUCCESS = '@@core/INIT_APP_SUCCESS',
}

export interface IInitAppAction {
  type: ActionTypes.INIT_APP_START;
  payload: {
    ctx: NextPageContext
  };
}

export interface IInitAppSuccessAction {
  type: ActionTypes.INIT_APP_SUCCESS
}
