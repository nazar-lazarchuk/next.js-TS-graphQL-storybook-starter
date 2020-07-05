import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { withTranslation } from 'utils/localization';
import { WithTranslation } from 'next-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';
//
import { PageLayout } from 'modules/Layout/components';

const IndexPage: NextPage<WithTranslation, {}> = () => {
  return (
    <PageLayout>
      <Head>
        <title>HiHome</title>
      </Head>
      <h1>HiHome</h1>
    </PageLayout>
  );
};

const enhance = compose(connect(), withTranslation());
export default enhance(IndexPage);
