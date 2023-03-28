import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import Head from 'next/head';
import Layout from '@/modules/layout';
import StyledContainer from '@/components/StyledContainer';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>cycplanner - Home</title>
      </Head>
      <StyledContainer variant="grid"></StyledContainer>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
