import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent } from 'react';

import Button from '@/components/button';

import { IconArrowLeft, IconBrandGoogle } from '@tabler/icons-react';

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
            <Button type="icon" icon={<IconArrowLeft />} label="Back" />
          </Link>
          <div className="authentication-content-wrapper">
            <header className="content-header-wrapper">
              <div className="header-logo-wrapper">
                <Image
                  src="/assets/logo.svg"
                  alt=""
                  width={160}
                  height={160}
                  className="header-logo"
                />
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
              <div className="form-input-wrapper">
                <label htmlFor="email" className="label-name">
                  <span className="form-input-label">Email</span>
                </label>
                <input
                  className="form-input"
                  type="email"
                  title="Enter email"
                  name="email"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-input-wrapper">
                <label htmlFor="password" className="label-name">
                  <span className="form-input-label">Password</span>
                </label>
                <input
                  className="form-input"
                  type="password"
                  title="Enter password"
                  name="password"
                  autoComplete="off"
                  required
                />
              </div>
              <Button type="filled" label="Continue" size="xl" stretched />
            </form>
            <footer className="content-alternatives-wrapper">
              <div className="alternatives-title-wrapper">
                <div className="alt-line" />
                <p className="alt-title">Or continue with</p>
                <div className="alt-line" />
              </div>
              <div className="alternatives-buttons-wrapper">
                <Button
                  type="icon-outlined"
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
