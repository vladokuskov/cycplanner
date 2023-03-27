import GlobalStyle from '@/styles/GlobalStyle';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { store } from '@/store/store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
