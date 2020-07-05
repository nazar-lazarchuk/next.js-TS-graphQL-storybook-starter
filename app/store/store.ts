import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );

  // @ts-ignore
  // @eslint-disable
  store.sagaTask = sagaMiddleware.run(rootSaga);

  // @ts-ignore
  if (module.hot && process.env.NODE_ENV !== 'production') {
    // Enable Webpack hot module replacement for reducers
    // @ts-ignore
    module.hot.accept('./rootReducer', () => {
      const { default: nextRootReducer } = require('./rootReducer');

      store.replaceReducer(nextRootReducer);
    });
    // @ts-ignore
    module.hot.accept('./rootSaga', () => {
      const { default: getNewSagas } = require('./rootSaga');

      // @ts-ignore
      store.sagaTask.cancel();
      // @ts-ignore
      store.sagaTask.toPromise().then(() => {
        // @ts-ignore
        // @eslint-disable
        store.sagaTask = sagaMiddleware.run(function* replacedSaga() {
          yield getNewSagas();
        });
      });
    });
  }

  return store;
}

export default configureStore;
