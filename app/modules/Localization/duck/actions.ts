import { ActionTypes, IChangeLanguageAction, ISetLocaleAction, ISetLocalesAction } from './types';

export const changeLanguage = (locale: string): IChangeLanguageAction => ({
  type: ActionTypes.ON_CHANGE_LANGUAGE,
  payload: locale,
});

export const setLocales = (locales: string[]): ISetLocalesAction => ({
  type: ActionTypes.SET_LOCALES,
  payload: locales
});

export const setLocale = (locale: string): ISetLocaleAction => ({
  type: ActionTypes.SET_LOCALE,
  payload: locale
});

export type LocalizationActionTypes = IChangeLanguageAction | ISetLocalesAction | ISetLocaleAction;
