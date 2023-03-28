import {
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '@/firebase/auth';
import { useState, useEffect, useContext } from 'react';
import { auth } from '@/firebase/auth';
import { createContext } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader } from '@/components/styledComponents/Loader';

export type AuthContext = {
  user: User | null;
  signup: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  signWithGoogle: () => void;
  logoutUser: () => void;
};

const authContextDefaultValues: AuthContext = {
  user: null,
  signup: () => {},
  login: () => {},
  signWithGoogle: () => {},
  logoutUser: () => {},
};

const AuthContext = createContext<AuthContext>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function signup(name: string, email: string, password: string) {
    return registerWithEmailAndPassword(name, email, password);
  }

  function login(email: string, password: string) {
    return logInWithEmailAndPassword(email, password);
  }

  function signWithGoogle() {
    return signInWithGoogle;
  }

  function logoutUser() {
    return logout();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });

    return unsubscribe();
  }, []);

  const value = {
    user,
    signup,
    login,
    logoutUser,
    signWithGoogle,
  };

  if (isLoading) {
    return <Loader />; // Render a loading bar if isLoading is true
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
