import { logout, signInWithGoogle } from '@/firebase/auth';
import { useState, useEffect, useContext } from 'react';
import { auth } from '@/firebase/auth';
import { createContext } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader } from '@/components/Loader/Loader';

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
