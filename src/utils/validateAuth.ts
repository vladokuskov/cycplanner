import { FirebaseError } from 'firebase/app';

interface FormValidationProps {
  email: string;
  username?: string;
  password: string;
}

export const validateAuth = async ({
  email,
  username,
  password,
}: FormValidationProps) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email is valid
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  // Check if it's a login form or a registration form
  if (username) {
    // Check if username and password are not empty
    if (!username.trim()) {
      throw new Error('Please enter a username.');
    }
  } else {
    // Check if password is not empty
    if (password.length < 8) {
      throw new Error(
        'Please enter a password that is at least 8 characters long.'
      );
    }
  }

  // Form is valid, return true or any other data you want
  return true;
};

export const getErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Invalid email or password';
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later.';
    default:
      return error.code;
  }
};
