import type { AppProps } from 'next/app';

import Footer from '@/modules/footer';
import Navbar from '@/modules/navbar/nav';

import '@/sass/style.scss';

import Layout from '@/modules/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
}
