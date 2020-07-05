import { take, put } from 'redux-saga/effects';
//
import { ActionTypes } from './types';
import { setLocale } from './actions';
import { i18n } from 'utils/localization';

function* changeLanguageTask() {
  while (true) {
    try {
      const { payload } = yield take(ActionTypes.ON_CHANGE_LANGUAGE);
      yield i18n.changeLanguage(payload);
      yield put(setLocale(payload));
    } catch (e) {
      //
    }
  }
}

export default [changeLanguageTask];
