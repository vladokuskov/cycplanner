import Auth from '@/components/styledComponents/auth/Auth';
import RestrictedRoute from '@/modules/ResctrictedRoute';
import Head from 'next/head';

export default function Web() {
  return (
    <RestrictedRoute>
      <Head>
        <title>cycplanner - Sign up</title>
      </Head>
      <Auth variant="signup" />
    </RestrictedRoute>
  );
}
