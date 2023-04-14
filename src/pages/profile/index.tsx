import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/styledComponents/StyledContainer';
import { PhotoSection } from '@/components/styledComponents/profile/PhotoSection';
import { PageSeparator } from '@/components/styledComponents/PageSeparator';
import { Button } from '@/components/styledComponents/Button';
import { useAuth } from '@/context/AuthContext';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  const { logoutUser } = useAuth();

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner - Profile</title>
        </Head>
        <StyledContainer variant="page">
          <PhotoSection />
          <PageSeparator />
          <Button text="Log out" onClick={logoutUser} />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
