import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/StyledContainer/StyledContainer';
import { EventCreationForm } from '@/components/Creation/EventCreationForm/EventCreationForm';
import { PageSeparator } from '@/components/PageSeparator/PageSeparator';
import { RandomQuote } from '@/components/Creation/RandomQuote/RandomQuote';

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
