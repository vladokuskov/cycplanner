import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import StyledContainer from '@/components/styledComponents/StyledContainer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/styledComponents/Button';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  const { user, logoutUser } = useAuth();

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner - Profile</title>
        </Head>
        <StyledContainer variant="grid">
          <h1>Profile page</h1>
          <p>UID: {user?.uid}</p>
          <p>EMAIL: {user?.email}</p>
          <Button onClick={logoutUser} variant="outlined" text="Log out" />
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
