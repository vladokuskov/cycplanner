import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '@/firebase/auth';
import { convertFirebaseError } from '@/utils/convertFirebaseError';
import { validateAuth } from '@/utils/validateAuth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeftLong, faKey } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { StyledFailedText } from '../ProfilePage/StyledProfile.styles';
import {
  StyledAltButtonsWrapper,
  StyledAltHeaderWrapper,
  StyledAltTitle,
  StyledAuthAltSectionWrapper,
  StyledAuthBanner,
  StyledAuthBannerWrapper,
  StyledAuthContentWrapper,
  StyledAuthFormWrapper,
  StyledAuthHeaderWrapper,
  StyledAuthLayoutWrapper,
  StyledAuthLink,
  StyledAuthWrapper,
  StyledHeaderInfoWrapper,
  StyledHeaderLogoWrapper,
  StyledHeaderTitle,
} from './Auth.styles';
import { Auth } from './Auth.types';

const Auth = ({ variant }: Auth) => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationPassword, setConfirmationPassword] = useState<string>('');
  const [isFormValidated, setIsFormValidated] = useState<boolean>(true);
  const [validationResponse, setValidationResponse] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordsEqual = () => confirmationPassword === password;

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
    isLogin: boolean
  ) => {
    e.preventDefault();

    try {
      const isValid = await validateAuth(
        isLogin ? { email, password } : { email, username, password }
      );
      if (isValid) {
        if (isLogin) {
          await logInWithEmailAndPassword(email, password);
        } else if (confirmationPassword !== password) {
          setValidationResponse('Passwords do not match');
          return null;
        } else {
          await registerWithEmailAndPassword(username, email, password);
        }

        setEmail('');
        setPassword('');
        setUsername('');

        router.push('/');
      }
    } catch (err: any) {
      setValidationResponse(convertFirebaseError(err.code));
      setIsFormValidated(false);
    }
  };

  // Boolean value in handleForm indicate whether the form being handled is a login or a registration form.

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>
    handleForm(e, true);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) =>
    handleForm(e, false);

  const handleSignWithGoogle = async () => {
    await signInWithGoogle();

    router.push('/');
    try {
    } catch (err: any) {
      setValidationResponse(convertFirebaseError(err.code));
    }
  };

  return (
    <StyledAuthLayoutWrapper>
      <StyledAuthWrapper>
        <Button
          variant="icon"
          size="md3"
          icon={faArrowLeftLong}
          onClick={() => router.push('/')}
          className="back-button"
        />
        <StyledAuthContentWrapper>
          <StyledAuthHeaderWrapper>
            <StyledHeaderLogoWrapper>
              <Image src="/assets/logo.svg" alt="" width={80} height={50} />
            </StyledHeaderLogoWrapper>
            <StyledHeaderInfoWrapper>
              <StyledHeaderTitle>
                {variant === 'login' ? 'Welcome Back' : 'Create an account'}
              </StyledHeaderTitle>
            </StyledHeaderInfoWrapper>
            <Link href={variant === 'login' ? '/signup' : '/login'}>
              <StyledAuthLink>
                {`${
                  variant === 'login' ? "Don't" : 'Already'
                } have an account?`}
                <span>{`${variant === 'login' ? ' Sign up' : ' Log in'}`}</span>
              </StyledAuthLink>
            </Link>
          </StyledAuthHeaderWrapper>
          <StyledAuthFormWrapper
            onSubmit={variant === 'login' ? handleLogin : handleRegistration}
          >
            {variant === 'signup' && (
              <Input
                value={username}
                variant="auth"
                icon={faUser}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setUsername(e.target.value)}
                label="Username"
                full
                required
                danger={!isFormValidated}
              />
            )}
            <Input
              fieldType="email"
              value={email}
              variant="auth"
              icon={faEnvelope}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setEmail(e.target.value)}
              label="Email"
              full
              required
              danger={!isFormValidated}
            />
            <Input
              fieldType="password"
              isPassShowed={showPassword}
              value={password}
              variant="auth"
              icon={faKey}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setPassword(e.target.value)}
              onClick={handleTogglePasswordVisibility}
              label="Password"
              full
              required
              danger={!isFormValidated}
            />
            {variant === 'signup' && (
              <Input
                fieldType="password"
                isPassShowed={showPassword}
                value={confirmationPassword}
                variant="auth"
                icon={faKey}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setConfirmationPassword(e.target.value)}
                onClick={handleTogglePasswordVisibility}
                label="Repeat password"
                full
                required
                danger={!isFormValidated || !isPasswordsEqual()}
              />
            )}
            {validationResponse.length > 0 && (
              <StyledFailedText>{validationResponse}</StyledFailedText>
            )}
            <Button
              text={variant === 'login' ? 'Log in' : 'Sign up'}
              buttonType="submit"
              full
            />
          </StyledAuthFormWrapper>
          <StyledAuthAltSectionWrapper>
            <StyledAltHeaderWrapper>
              <StyledAltTitle>Or continue with</StyledAltTitle>
            </StyledAltHeaderWrapper>
            <StyledAltButtonsWrapper>
              <Button
                text="Google"
                variant="text-icon"
                icon={faGoogle}
                full
                bold
                onClick={handleSignWithGoogle}
              />
            </StyledAltButtonsWrapper>
          </StyledAuthAltSectionWrapper>
        </StyledAuthContentWrapper>
        <StyledAuthBannerWrapper>
          <StyledAuthBanner>
            <Image src="/assets/auth/auth-banner.webp" alt="" fill />
          </StyledAuthBanner>
        </StyledAuthBannerWrapper>
      </StyledAuthWrapper>
    </StyledAuthLayoutWrapper>
  );
};

export { Auth };
