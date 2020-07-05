/**
 * Custom Next.js Document
 * Used for html lang attribute and common <head> elements
 * seo tags should be passed separately in pages components
 */

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { lngFromReq } from 'next-i18next/dist/commonjs/utils';
//

type Props = {
  lang: string;
};

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // get current language from request and pass it to props on ssr
    const lang = lngFromReq(ctx.req);
    return { ...initialProps, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
