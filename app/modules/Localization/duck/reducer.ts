import { produce } from 'immer';
//
import { ActionTypes, ILocalizationState } from './types';
import { LocalizationActionTypes } from './actions';

const initialState: ILocalizationState = {
  locales: [],
  currentLocale: '',
};

const reducer = (
  state: ILocalizationState = initialState,
  action: LocalizationActionTypes,
) => produce(state, draft => {
  switch (action.type) {
    case ActionTypes.SET_LOCALES:
      draft.locales = action.payload;
      break;
    case ActionTypes.SET_LOCALE:
      draft.currentLocale = action.payload;
      break;
    default:
      break;
  }
});

export default reducer;
