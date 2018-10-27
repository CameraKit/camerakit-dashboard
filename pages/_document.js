import React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { GA_TRACKING_ID } from '../lib/gtag';

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />
          <meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height" />
          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/static/favicon/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/favicon/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/favicon/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/favicon/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/static/favicon/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/favicon/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/static/favicon/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicon/apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon-128.png" sizes="128x128" />
          <meta name="application-name" content="CameraKit" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/static/favicon/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/static/favicon/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/static/favicon/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/static/favicon/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/static/favicon/mstile-310x310.png" />
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = (ctx) => {
  let pageContext;
  const page = ctx.renderPage((Component) => {
    const WrappedComponent = (props) => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired,
    };

    return WrappedComponent;
  });

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
