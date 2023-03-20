import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent } from 'react';

import Button from '@/components/button';

import { IconArrowLeft, IconBrandGoogle } from '@tabler/icons-react';
import Input from '@/components/input';

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};

const Login = () => {
  return (
    <>
      <Head>
        <title>cycplanner - Log in</title>
      </Head>
      <div className="authentication-main-wrapper">
        <div className="authentication-wrapper">
          <Link href="/">
            <Button variant="icon" icon={<IconArrowLeft />} label="Back" />
          </Link>
          <div className="authentication-content-wrapper">
            <header className="content-header-wrapper">
              <div className="header-logo-wrapper">
                <img src="/assets/logo.svg" alt="" className="header-logo" />
              </div>
              <div className="header-info-wrapper">
                <h2 className="info-title">Welcome Back</h2>
                <p className="info-subtitle">
                  Welcome Back, please enter your details
                </p>
              </div>
              <Link href="/signup" className="header-link">
                Don`t have an account?<span> Sign up</span>
              </Link>
            </header>
            <form className="content-form-wrapper" onSubmit={handleSubmit}>
              <Input
                variant="email"
                placeHolder="Enter email"
                icon="email"
                label="Email"
              />
              <Input
                variant="password"
                placeHolder="Enter Password"
                icon="password"
                label="Password"
              />
              <Button variant="filled" label="Continue" size="xl" stretched />
            </form>
            <footer className="content-alternatives-wrapper">
              <div className="alternatives-title-wrapper">
                <div className="alt-line" />
                <p className="alt-title">Or continue with</p>
                <div className="alt-line" />
              </div>
              <div className="alternatives-buttons-wrapper">
                <Button
                  variant="icon-outlined"
                  icon={<IconBrandGoogle />}
                  label="Continue with Google"
                />
              </div>
            </footer>
          </div>
          <div className="authentication-banner-wrapper">
            <Image
              src="/assets/auth/auth-banner.webp"
              alt=""
              fill
              className="authentication-banner"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
