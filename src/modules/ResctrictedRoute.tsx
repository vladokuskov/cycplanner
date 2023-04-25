import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ChildrenProps } from '@/components/types/shared/routeChildren.types';
import { useAuth } from '@/context/AuthContext';

export default function RestrictedRoute({ children }: ChildrenProps) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  if (user) {
    return null;
  }

  return <>{children}</>;
}
