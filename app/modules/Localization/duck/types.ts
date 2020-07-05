export interface ILocalizationState {
  locales: string[];
  currentLocale: string;
}

export enum ActionTypes {
  ON_CHANGE_LANGUAGE = '@@localization/CHANGE_LANGUAGE',
  SET_LOCALES = '@@localization/SET_LOCALES',
  SET_LOCALE = '@@localization/SET_LOCALE',
}

export interface IChangeLanguageAction {
  type: ActionTypes.ON_CHANGE_LANGUAGE;
  payload: string;
}

export interface ISetLocalesAction {
  type: ActionTypes.SET_LOCALES;
  payload: string[];
}

export interface ISetLocaleAction {
  type: ActionTypes.SET_LOCALE,
  payload: string;
}
