import { take, put, fork } from 'redux-saga/effects';
//
import { ActionTypes } from './types';
import { getLanguagesFromReq } from 'utils/localization';
import { localizationActions } from 'modules/Localization/duck';
import { NextPageContext } from 'next';

// import Client from 'utils/apollo-client';
// import gql from 'graphql-tag';

/**
 * Core saga task
 * using for fetch and set core application data
 * works only on ssr, dispatch located in 'pages/_app.tsx'
 */
function* initAppTask() {
  while (true) {
    try {
      const { payload: { ctx } } = yield take(ActionTypes.INIT_APP_START);

      yield fork(setLocales, ctx);
      // ield fork(setCommonData, ctx);
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  }
}

function* setLocales(ctx: NextPageContext) {
  const locales = getLanguagesFromReq(ctx.req);
  yield put(localizationActions.setLocale(locales.current));
  yield put(localizationActions.setLocales(locales.all));
}

export default [initAppTask];
