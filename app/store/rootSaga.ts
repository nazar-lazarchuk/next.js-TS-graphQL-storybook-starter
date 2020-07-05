import { all, fork } from 'redux-saga/effects';
//
import { coreSagas } from 'modules/Core/duck';
import { localizationSagas } from 'modules/Localization/duck';

const sagas = [
  ...coreSagas,
  ...localizationSagas,
  // add sagas here
];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default rootSaga;
