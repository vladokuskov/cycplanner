import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/StyledContainer/StyledContainer';
import { BannerSection } from '@/components/styledComponents/contact/BannerSection';
import { PageSeparator } from '@/components/PageSeparator/PageSeparator';
import { FormSection } from '@/components/styledComponents/contact/FormSection';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });
  return (
    <DynamicLayout>
      <Head>
        <title>cycplanner - Contact us</title>
      </Head>
      <StyledContainer variant="page">
        <BannerSection />
        <PageSeparator />
        <FormSection />
      </StyledContainer>
    </DynamicLayout>
  );
}
