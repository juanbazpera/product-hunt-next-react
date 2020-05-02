import React from 'react';
import Head from 'next/head';
import Header from '../layout/Header';

const Layout = (props) => {
  return (
    <>
      <Head>
        <link
          href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh'
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU='
        />
        <link
          href='https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto:wght@100;700&display=swap'
          rel='stylesheet'
        />
        <link href='/static/css/app.css' rel='stylesheet' />
        <title>Product Hunt Firebase y Next.js</title>
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
