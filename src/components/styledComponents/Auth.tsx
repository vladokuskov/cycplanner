import styled from 'styled-components';
import { AuthPageProps } from '../types/props/authPageProps.types';

import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '@/firebase/auth';

import { useRouter } from 'next/router';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Input } from './Input';
import { Button } from './Button';

import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeftLong, faKey } from '@fortawesome/free-solid-svg-icons';
import { getErrorMessage, validateAuth } from '@/utils/validateAuth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const AuthLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (min-height: 400px) and (min-width: 680px) {
    height: 100vh;
  }
`;

const AuthWrapper = styled.div`
  position: relative;
  max-width: 950px;
  min-height: 32rem;
  min-width: 16rem;
  width: 100%;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fbfbfb;
  box-shadow: 0px 0px 21px -3px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  padding: 0.7rem;
  @media (min-width: 680px) {
    flex-direction: row;
    max-height: 40rem;
  }
  .back-button {
    position: absolute;
    top: 0.5rem;
    left: 0.7rem;
  }
`;

const AuthContentWrapper = styled.div`
  padding-top: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  @media (min-width: 680px) {
    padding-top: 0.5rem;
  }
`;

const AuthBannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: none;
  border-radius: 10px;
  @media (min-width: 680px) {
    display: block;
  }
`;

const AuthBanner = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  img {
    object-fit: cover;
    border-radius: 10px;
  }
`;

const AuthHeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  width: 95%;
  a {
    text-decoration: none;
  }
`;

const HeaderLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 10rem;
  min-width: 10rem;
  height: 100%;
  width: 100%;
  margin-bottom: 1rem;
  @media (min-width: 680px) {
    margin-bottom: 2rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
const HeaderInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const HeaderTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  line-height: 37px;
  font-weight: 700;
  color: #2c2c2c;
  margin: 0;
`;

const AuthFormWrapper = styled.form`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
`;

const AuthLink = styled.span`
  color: #999999;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 13px;
  cursor: pointer;
  span {
    color: #2c2c2c;
    font-weight: 600;
    text-decoration: underline;
  }
  :hover {
    span {
      color: #6d6d6d;
      text-decoration: underline;
    }
  }
`;

const FailedText = styled.p`
  color: #df3737;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 13px;
  margin: 0;
  align-self: flex-start;
`;

const AuthAltSectionWrapper = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;
const AltHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const Line = styled.div`
  padding: 0.035rem;
  border-radius: 10px;
  border: none;
  background-color: #bdbdbd9d;
  width: 3rem;
`;

const AltTitle = styled.p`
  font-weight: 500;
  color: #999999;
`;
const AltButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  gap: 0.7rem;
`;

export default function Auth({ variant }: AuthPageProps) {
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
      setValidationResponse(getErrorMessage(err));
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
      setValidationResponse(getErrorMessage(err));
      setIsFormValidated(false);
    }
  };

  const handleSignWithGoogle = async () => {
    await signInWithGoogle();

    router.push('/');
    try {
    } catch (err: any) {
      setValidationResponse(getErrorMessage(err));
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                label="Username"
                placeholder="Enter username"
                full
                required
                danger={!isFormValidated}
              />
            )}
            <Input
              value={email}
              variant="auth"
              icon={faEnvelope}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              label="Email"
              placeholder="Enter email"
              full
              required
              danger={!isFormValidated}
            />
            <Input
              isPassShowed={showPassword}
              value={password}
              variant="auth-pass"
              icon={faKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
              <Line />
              <AltTitle>Or continue with</AltTitle>
              <Line />
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
