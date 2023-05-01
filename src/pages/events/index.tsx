import dynamic from 'next/dynamic';
import Head from 'next/head';

import { EventsSection } from '@/components/EventsPage/EventsSection/EventsSection';
import { EventsSidebar } from '@/components/EventsPage/SidebarSection/EventsSidebar';
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
