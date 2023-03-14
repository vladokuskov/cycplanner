import Link from 'next/link';
import { FormEvent } from 'react';

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-content-wrapper">
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
          <div className="form-input-wrapper">
            <input
              className="form-input"
              type="email"
              title="Enter email"
              name="email"
              autoComplete="off"
              required
            />
            <label htmlFor="email" className="label-name">
              <span className="form-input-label">Email</span>
            </label>
          </div>
          <div className="form-input-wrapper">
            <input
              className="form-input"
              type="password"
              title="Enter password"
              name="password"
              autoComplete="off"
              required
            />
            <label htmlFor="password" className="label-name">
              <span className="form-input-label">Password</span>
            </label>
          </div>
          <button className="form-submit-button" title="Continue">
            Continue
          </button>
        </form>
        <footer className="content-alternatives-wrapper">
          <div className="alternatives-title-wrapper"></div>
        </footer>
      </div>
      <div className="login-banner-wrapper"></div>
    </div>
  );
};

export default Login;
