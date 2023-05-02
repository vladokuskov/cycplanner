import dynamic from 'next/dynamic';
import Head from 'next/head';

import { ProfileMainSection } from '@/components/ProfilePage/ProfileMainSection';
import { ProfileSidebar } from '@/components/ProfilePage/ProfileSidebar/ProfileSidebar';
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
          <title>cycplanner - Profile</title>
        </Head>
        <StyledContainer variant="page">
          <StyledContainer variant="profile-page">
            <ProfileSidebar />
            <ProfileMainSection />
          </StyledContainer>
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
