import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer, {
  StyledPageContainer,
} from '@/components/styledComponents/StyledContainer';
import { PageSeparator } from '@/components/styledComponents/PageSeparator';
import { StartSection } from '@/components/styledComponents/home/StartSection';
import { EventsSection } from '@/components/styledComponents/home/EventsSection';

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
