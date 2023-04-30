import { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';

import { Loader } from '@/components/Loader/Loader';
import { auth, logout, signInWithGoogle } from '@/firebase/auth';

export type AuthContext = {
  user: User | null;
  logoutUser: () => void;
};

const authContextDefaultValues: AuthContext = {
  user: null,
  logoutUser: () => {},
};

const AuthContext = createContext<AuthContext>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function signWithGoogle() {
    return signInWithGoogle;
  }

  function logoutUser() {
    setUser(null);
    return logout();
  }

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const value = {
    user,
    logoutUser,
    signWithGoogle,
  };

  if (isLoading) {
    return <Loader />; // Render a loading bar if isLoading is true
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
