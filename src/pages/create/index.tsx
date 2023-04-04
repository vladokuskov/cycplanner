import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/styledComponents/StyledContainer';
import { EventCreation } from '@/components/styledComponents/EventCreation';
import PageTitle from '@/components/styledComponents/PageTitle';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner - Create event</title>
        </Head>
        <StyledContainer variant="page">
          <EventCreation />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
