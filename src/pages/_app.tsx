import type { AppProps } from 'next/app';

import Footer from '@/modules/footer';
import Navbar from '@/modules/navbar/nav';

import { Provider } from 'react-redux';
import { store } from '@/store/store';

import '@/sass/style.scss';

import Layout from '@/modules/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Navbar />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <Footer />
    </Layout>
  );
}
