import Head from 'next/head';
import type { ReactElement } from 'react';
import Layout from '@/modules/layout';
import StyledContainer from '@/components/StyledContainer';

export default function Contact() {
  return (
    <>
      <Head>
        <title>cycplanner - Contact us</title>
      </Head>
      <StyledContainer variant="grid"></StyledContainer>
    </>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
