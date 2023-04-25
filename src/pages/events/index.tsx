import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/StyledContainer/StyledContainer';
import { EventsSidebar } from '@/components/EventsPage/SidebarSection/EventsSidebar';
import { EventsSection } from '@/components/EventsPage/EventsSection/EventsSection';

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
