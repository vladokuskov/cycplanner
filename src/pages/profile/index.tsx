import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/styledComponents/StyledContainer';
import { PhotoSection } from '@/components/styledComponents/profile/Avatar/AvatarSection';
import { PageSeparator } from '@/components/styledComponents/PageSeparator';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner - Profile</title>
        </Head>
        <StyledContainer variant="page">
          <PhotoSection />
          <PageSeparator />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
