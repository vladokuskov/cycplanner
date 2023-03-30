import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ChildrenProps } from '@/components/types/props/routeChildren.types';
import { useAuth } from '@/context/AuthContext';

export default function PrivateRoute({ children }: ChildrenProps) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user == null) {
      router.push('/login');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
