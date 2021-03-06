import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { Hero, Title, AuthInput, AuthButton } from '../../components/auth/auth.component';
import { AppLogo } from '../../components/svg/svg.component';
import OAuth from '../../components/o-auth/o-auth.component';

const LoginPage = () => {
  const { signInWithCredentials } = useAuth();
  const [email, setEmail] = useState('test@email.com');
  const [password, setPassword] = useState('test123');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    signInWithCredentials(email, password).then(
      () => {
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="container is-fullhd">
      <Hero className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-4 is-offset-4">
                <Link to="/">
                  <AppLogo />
                </Link>
                <Title className="title">Sign in</Title>
                {error ? <div className="notification is-danger is-light">{error}</div> : null}
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <div className="control has-icons-right">
                      <AuthInput
                        type="email"
                        className="input"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-right">
                      <AuthInput
                        type="password"
                        className="input"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        required
                      />
                    </div>
                  </div>
                  <div className="control">
                    <AuthButton
                      type="submit"
                      className={`button is-dark is-fullwidth has-text-weight-semibold ${
                        isLoading ? 'is-loading' : null
                      }`}
                    >
                      Log in
                    </AuthButton>
                  </div>
                </form>
                <Link to="/signup">Don't have an account?</Link>
                <OAuth />
              </div>
            </div>
          </div>
        </div>
      </Hero>
    </div>
  );
};

export default LoginPage;
