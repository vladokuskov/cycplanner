import dynamic from 'next/dynamic';
import Head from 'next/head';

import { EventsSection } from '@/components/HomePage/EventsSection/EventsSection';
import { StartSection } from '@/components/HomePage/StartSection/StartSection';
import { PageSeparator } from '@/components/PageSeparator/PageSeparator';
import StyledContainer, {
  StyledPageContainer,
} from '@/components/StyledContainer/StyledContainer';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  return (
    <DynamicLayout>
      <Head>
        <title>cycplanner - Home</title>
      </Head>
      <StyledContainer variant="page">
        <StyledPageContainer>
          <StartSection />
          <PageSeparator />
          <EventsSection />
        </StyledPageContainer>
      </StyledContainer>
    </DynamicLayout>
  );
}
