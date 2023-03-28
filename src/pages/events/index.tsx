import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/styledComponents/StyledContainer';
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
        <StyledContainer variant="grid"></StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
