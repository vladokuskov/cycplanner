import Head from 'next/head';
import type { ReactElement } from 'react';
import Layout from '@/modules/layout';

export default function Events() {
  return (
    <>
      <Head>
        <title>cycplanner - Events</title>
      </Head>
    </>
  );
}

Events.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
