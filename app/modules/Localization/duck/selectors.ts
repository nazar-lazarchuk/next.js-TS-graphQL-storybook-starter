import { createSelector } from 'reselect';
//
import { ILocalizationState } from './types';

const baseSelector = (state): ILocalizationState => state.Localization;

export const localesSelector = createSelector(baseSelector, state => state.locales);
export const currentLocaleSelector = createSelector(baseSelector, state => state.currentLocale);
