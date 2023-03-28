import { useRouter } from 'next/router';
import React from 'react';
import { ChildrenProps } from '@/components/types/props/routeChildren.types';
import { useAuth } from '@/context/AuthContext';

export default function RestrictedRoute({ children }: ChildrenProps) {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.replace('/');
    return null;
  }

  return <>{children}</>;
}
