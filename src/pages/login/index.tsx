import Auth from '@/components/styledComponents/auth/Auth';
import RestrictedRoute from '@/modules/ResctrictedRoute';
import Head from 'next/head';

export default function Web() {
  return (
    <RestrictedRoute>
      <Head>
        <title>cycplanner - Log in</title>
      </Head>
      <Auth variant="login" />
    </RestrictedRoute>
  );
}
