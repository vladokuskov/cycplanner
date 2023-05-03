const convertFirebaseError = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/user-disabled':
      return 'The user account has been disabled.';
    case 'auth/user-not-found':
      return 'There is no user record corresponding to this email address.';
    case 'auth/wrong-password':
      return 'The password is invalid.';
    case 'auth/email-already-in-use':
      return 'The email address is already in use.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'permission-denied':
      return 'You do not have permission to access this resource.';
    case 'not-found':
      return 'The requested resource could not be found.';
    case 'already-exists':
      return 'The resource already exists.';
    case 'auth/popup-closed-by-user':
      return 'You closed the sign-in popup window';
    default:
      return 'An unknown error occurred. Please try again.';
  }
};

export { convertFirebaseError };
