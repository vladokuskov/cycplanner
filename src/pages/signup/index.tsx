import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent } from 'react';

import RestrictedRoute from '@/modules/ResctrictedRoute';

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};

export default function Web() {
  return (
    <RestrictedRoute>
      <Head>
        <title>cycplanner - Sign up</title>
      </Head>
      <div>Sign up page</div>
    </RestrictedRoute>
  );
}
