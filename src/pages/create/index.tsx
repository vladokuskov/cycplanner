import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/styledComponents/StyledContainer';
import { EventCreationForm } from '@/components/styledComponents/EventCreationForm';
import { PageSeparator } from '@/components/styledComponents/PageSeparator';

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
          <EventCreationForm />
          <PageSeparator />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
