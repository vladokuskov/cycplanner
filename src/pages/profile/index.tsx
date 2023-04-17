import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/styledComponents/StyledContainer';
import { PhotoSection } from '@/components/styledComponents/profile/Avatar/AvatarSection';
import { PageSeparator } from '@/components/styledComponents/PageSeparator';
import {
  ProfileEditingSection,
  Title,
} from '@/components/styledComponents/profile/StyledProfile';
import { EditSection } from '@/components/styledComponents/profile/EditSection/EditSection';
import { ProfileDeleteSection } from '@/components/styledComponents/profile/DeleteSection/ProfileDeleteSection';

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
          <Title>My profile</Title>
          <ProfileEditingSection>
            <PhotoSection />
            <EditSection />
          </ProfileEditingSection>
          <PageSeparator />
          <ProfileDeleteSection />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
