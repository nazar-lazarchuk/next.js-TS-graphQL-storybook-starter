/**
 * modules
 */
import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { ApolloProvider } from '@apollo/react-hooks';

/**
 * utils
 */
import { appWithTranslation } from 'utils/localization';
import resolveNs from 'utils/localization/resolveNs';
import withApolloData from 'utils/apollo-client';

/**
 * redux store
 */
import { createStore } from '../app/store';

/**
 * Core stuff
 */
import { coreActions } from 'modules/Core/duck';

/**
 * App stuff
 */
import BaseLayout from 'common/BaseLayout';
import '../app/assets/styles/index.scss';

class CustomApp extends App<{ store, apollo, ssrApolloCache }> {
  static async getInitialProps({ Component, ctx }) {
    const { isServer, store } = ctx;

    if (isServer) {
      store.dispatch(coreActions.initAppStart({ ctx }));
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);

      // page localization namespaces
      resolveNs(pageProps);
    }

    let ssrApolloCache;
    if (isServer) {
      ssrApolloCache = ctx.apolloClient.cache.extract();
    }

    return { pageProps, ssrApolloCache };
  }

  componentDidMount() {
    const { apollo, ssrApolloCache } = this.props;
    apollo.cache.restore(ssrApolloCache);
  }

  render() {
    const { Component, pageProps, store, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Provider store={store}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </Provider>
      </ApolloProvider>
    );
  }
}

/**
 * Connect Next App to Redux store and redux-saga
 * Connect Next App to localizations
 * Connect Next App to i18n
 * Connect Next App to Apollo Client
 */
const enhance = compose(
  withRedux(createStore),
  withReduxSaga,
  appWithTranslation,
  withApolloData,
);

export default enhance(CustomApp);
