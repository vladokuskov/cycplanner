import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/styledComponents/StyledContainer';
import { EventsSidebar } from '@/components/styledComponents/events/EventsSidebar';
import { EventFilter } from '@/components/styledComponents/event-filter/EventFilter';
import { EventsSection } from '@/components/styledComponents/events/EventsSection';

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
        <StyledContainer variant="events-page">
          <EventsSidebar />
          <EventsSection />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
