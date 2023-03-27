import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';

import { IconBrandGoogle, IconArrowLeft } from '@tabler/icons-react';

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};

const Signup = () => {
  return (
    <>
      <Head>
        <title>cycplanner - Sign up</title>
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
                <h2 className="info-title">Create an account</h2>
                <p className="info-subtitle">Join cycplanner community</p>
              </div>
              <Link href="/login" className="header-link">
                Already have an account?<span> Log in</span>
              </Link>
            </header>
            <form className="content-form-wrapper" onSubmit={handleSubmit}>
              <Input
                variant="account"
                placeHolder="Enter name"
                icon="account"
                label="Name"
              />
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
              <Button
                variant="filled"
                label="Create account"
                size="xl"
                stretched
              />
            </form>
            <footer className="content-alternatives-wrapper">
              <div className="alternatives-title-wrapper">
                <div className="alt-line" />
                <p className="alt-title">Or Sign up with</p>
                <div className="alt-line" />
              </div>
              <div className="alternatives-buttons-wrapper">
                <Button
                  variant="icon-outlined"
                  icon={<IconBrandGoogle />}
                  label="Sign up with Go  ogle"
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

export default Signup;
