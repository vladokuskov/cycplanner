import Head from 'next/head';
import type { ReactElement } from 'react';
import Layout from '@/modules/layout';
import StyledContainer from '@/components/StyledContainer';

export default function Events() {
  return (
    <>
      <Head>
        <title>cycplanner - Events</title>
      </Head>
      <StyledContainer variant="grid"></StyledContainer>
    </>
  );
}

Events.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
