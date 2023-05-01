import dynamic from 'next/dynamic';
import Head from 'next/head';

import { EventCreationForm } from '@/components/Creation/EventCreationForm/EventCreationForm';
import { RandomQuote } from '@/components/Creation/RandomQuote/RandomQuote';
import { PageSeparator } from '@/components/PageSeparator/PageSeparator';
import StyledContainer from '@/components/StyledContainer/StyledContainer';
import PrivateRoute from '@/modules/PrivateRoute';

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
          <RandomQuote />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
