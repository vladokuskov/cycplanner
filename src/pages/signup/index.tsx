import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent } from 'react';

import Button from '@/components/button';

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
            <Button type="icon" icon={<IconArrowLeft />} label="Back" />
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
              <div className="form-input-wrapper">
                <label htmlFor="name" className="label-name">
                  <span className="form-input-label">Name</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  title="Enter name"
                  name="name"
                  autoComplete="off"
                  required
                />
              </div>
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
              <Button
                type="filled"
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
                  type="icon-outlined"
                  icon={<IconBrandGoogle />}
                  label="Sign up with Google"
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
