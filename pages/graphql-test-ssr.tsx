import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { withTranslation, Link } from 'utils/localization';
import { WithTranslation } from 'next-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ApolloPageContext } from 'utils/apollo-client';
import gql from 'graphql-tag';
//
import { PageLayout } from 'modules/Layout/components';

const IndexPage: NextPage<WithTranslation & { data }, {}> = props => {
  const { data } = props;
  return (
    <PageLayout>
      <Head>
        <title>HiHome</title>
      </Head>
      <h1>SSR test</h1>
      <Link href="/graphql-test-nossr"><a>goto NoSSR test</a></Link>
      <h1>{data.hello}</h1>
    </PageLayout>
  );
};

IndexPage.getInitialProps = async (ctx: ApolloPageContext) => {
  const { data } = await ctx.apolloClient.query({
    query: gql`
      query HelloSSR {
        hello
      }
    `,
  });

  return { data };
};

const enhance = compose(connect(), withTranslation());
export default enhance(IndexPage);
