import { useState, useEffect } from 'react';
import {
  auth,
  logInWithEmailAndPassword,
  logout,
  signInWithGoogle,
} from '@/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function signUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      console.log('logged');
    }
    if (!user) {
      console.log('not logged');
    }
    if (error) {
      console.log(error);
    }
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}

export default signUp;
