import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { withTranslation, Link } from 'utils/localization';
import { WithTranslation } from 'next-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//
import { PageLayout } from 'modules/Layout/components';

const IndexPage: NextPage<WithTranslation, {}> = () => {
  const { loading, data, error } = useQuery(gql`
    query Hello {
      hello
    }
  `);
  return (
    <PageLayout>
      <Head>
        <title>Test page</title>
      </Head>
      <h1>SSR test</h1>
      <Link href="/graphql-test-ssr"><a>goto SSR test</a></Link>
      {loading && <h1>loading</h1>}
      {data && <h1>{data.hello}</h1>}
      {error && <h1>error</h1>}
    </PageLayout>
  );
};

const enhance = compose(connect(), withTranslation());
export default enhance(IndexPage);
