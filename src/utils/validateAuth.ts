type FormValidationProps = {
  email: string;
  username?: string;
  password: string;
};

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

  return true;
};
