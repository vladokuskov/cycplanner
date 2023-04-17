import { AuthPage } from '../../types/props/authPage.types';

import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '@/firebase/auth';

import { useRouter } from 'next/router';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Input } from '../Input';
import { Button } from '../Button';
import {
  AuthLayoutWrapper,
  AuthWrapper,
  AuthAltSectionWrapper,
  AuthBanner,
  AuthFormWrapper,
  AuthBannerWrapper,
  AuthContentWrapper,
  AuthHeaderWrapper,
  HeaderLogoWrapper,
  HeaderInfoWrapper,
  HeaderTitle,
  AuthLink,
  AltHeaderWrapper,
  AltTitle,
  AltButtonsWrapper,
} from './StyledAuth';

import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeftLong, faKey } from '@fortawesome/free-solid-svg-icons';
import { validateAuth } from '@/utils/validateAuth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { convertFirebaseError } from '@/utils/convertFirebaseError';
import { FailedText } from '../profile/StyledProfile';

export default function Auth({ variant }: AuthPage) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormValidated, setIsFormValidated] = useState<boolean>(true);
  const [validationResponse, setValidationResponse] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const isValid = await validateAuth({ email, password });
      if (isValid) {
        await logInWithEmailAndPassword(email, password);

        setEmail('');
        setPassword('');

        router.push('/');
      }
    } catch (err: any) {
      setValidationResponse(convertFirebaseError(err.code));
      setIsFormValidated(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const isValid = await validateAuth({ email, username, password });
      if (isValid) {
        await registerWithEmailAndPassword(username, email, password);

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

  const handleSignWithGoogle = async () => {
    await signInWithGoogle();

    router.push('/');
    try {
    } catch (err: any) {
      setValidationResponse(convertFirebaseError(err.code));
    }
  };

  return (
    <AuthLayoutWrapper>
      <AuthWrapper>
        <Button
          variant="icon"
          size="md3"
          icon={faArrowLeftLong}
          onClick={() => router.push('/')}
          className="back-button"
        />
        <AuthContentWrapper>
          <AuthHeaderWrapper>
            <HeaderLogoWrapper>
              <img src="/assets/logo.svg" alt="" />
            </HeaderLogoWrapper>
            <HeaderInfoWrapper>
              <HeaderTitle>
                {variant === 'login' ? 'Welcome Back' : 'Create an account'}
              </HeaderTitle>
            </HeaderInfoWrapper>
            <Link href={variant === 'login' ? '/signup' : '/login'}>
              <AuthLink>
                {`${
                  variant === 'login' ? "Don't" : 'Already'
                } have an account?`}
                <span>{`${variant === 'login' ? ' Sign up' : ' Log in'}`}</span>
              </AuthLink>
            </Link>
          </AuthHeaderWrapper>
          <AuthFormWrapper
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
                placeholder="Enter username"
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
              placeholder="Enter email"
              full
              required
              danger={!isFormValidated}
            />
            <Input
              fieldType="password"
              isPassShowed={showPassword}
              value={password}
              variant="auth-pass"
              icon={faKey}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setPassword(e.target.value)}
              onClick={handleTogglePasswordVisibility}
              label="Password"
              placeholder="Enter password"
              full
              required
              danger={!isFormValidated}
            />
            {validationResponse.length > 0 && (
              <FailedText>{validationResponse}</FailedText>
            )}
            <Button
              text={variant === 'login' ? 'Log in' : 'Sign up'}
              buttonType="submit"
              full
            />
          </AuthFormWrapper>
          <AuthAltSectionWrapper>
            <AltHeaderWrapper>
              <AltTitle>Or continue with</AltTitle>
            </AltHeaderWrapper>
            <AltButtonsWrapper>
              <Button
                text="Google"
                variant="text-icon"
                icon={faGoogle}
                full
                bold
                onClick={handleSignWithGoogle}
              />
            </AltButtonsWrapper>
          </AuthAltSectionWrapper>
        </AuthContentWrapper>
        <AuthBannerWrapper>
          <AuthBanner>
            <Image src="/assets/auth/auth-banner.webp" alt="" fill />
          </AuthBanner>
        </AuthBannerWrapper>
      </AuthWrapper>
    </AuthLayoutWrapper>
  );
}
