import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/styledComponents/StyledContainer';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner - Events</title>
        </Head>
        <StyledContainer variant="grid">
          <h1>Events page</h1>
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
