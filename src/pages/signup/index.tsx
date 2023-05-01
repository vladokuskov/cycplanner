import Head from 'next/head';

import { Auth } from '@/components/Auth/Auth';
import RestrictedRoute from '@/modules/ResctrictedRoute';

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
