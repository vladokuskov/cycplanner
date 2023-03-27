import Head from 'next/head';
import type { ReactElement } from 'react';
import Layout from '@/modules/layout';

export default function Contact() {
  return (
    <>
      <Head>
        <title>cycplanner - Contact us</title>
      </Head>
    </>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
