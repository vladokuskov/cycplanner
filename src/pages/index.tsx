import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/styledComponents/StyledContainer';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  return (
    <DynamicLayout>
      <Head>
        <title>cycplanner - Home</title>
      </Head>
      <StyledContainer variant="grid"></StyledContainer>
    </DynamicLayout>
  );
}
