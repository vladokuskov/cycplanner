import RestrictedRoute from '@/modules/ResctrictedRoute';
import Head from 'next/head';
import StyledContainer from '@/components/styledComponents/StyledContainer';

export default function Web() {
  return (
    <RestrictedRoute>
      <Head>
        <title>cycplanner - Create an event</title>
      </Head>
      <StyledContainer variant="grid">
        <h1>Event creation page</h1>
      </StyledContainer>
    </RestrictedRoute>
  );
}
