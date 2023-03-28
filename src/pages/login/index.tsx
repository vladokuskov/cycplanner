import Auth from '@/components/styledComponents/Auth';
import RestrictedRoute from '@/modules/ResctrictedRoute';
import Head from 'next/head';
import { FormEvent } from 'react';

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};

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
