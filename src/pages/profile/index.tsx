import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/styledComponents/StyledContainer';
import { useState } from 'react';
import { ProfileSections } from '@/components/types/props/Profile/profile';
import { ProfileSidebar } from '@/components/styledComponents/profile/ProfileSidebar';
import { ProfileMainSection } from '@/components/styledComponents/profile/ProfileMainSection';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });
  const [activeSection, setActiveSection] =
    useState<ProfileSections>('information');

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner - Profile</title>
        </Head>
        <StyledContainer variant="page">
          <StyledContainer variant="profile-page">
            <ProfileSidebar
              changeSection={(section) => setActiveSection(section)}
              activeSection={activeSection}
            />
            <ProfileMainSection acitveSection={activeSection} />
          </StyledContainer>
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
