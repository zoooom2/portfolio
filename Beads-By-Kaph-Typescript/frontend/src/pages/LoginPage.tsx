import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ChangeEvent, useCallback, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/contextHooks';
axios.defaults.withCredentials = true;

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { jwtAuth, googleAuth } = useUserContext();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;
      setCredentials({ ...credentials, [name]: value });
    },
    [credentials]
  );

  return (
    <Wrapper className='page-100 section section-center'>
      <div className='form_container'>
        <div className='right'>
          <img src='/kaph-logo.png' alt='logo' className='logo' />
          <input
            type='text'
            className='input'
            placeholder='Email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type='password'
            className='input'
            placeholder='Password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button
            className='btn'
            onClick={() => jwtAuth(credentials.email, credentials.password)}>
            Log In
          </button>
          <p className='text'>or</p>
          <button className='google_btn' onClick={googleAuth}>
            <img src='/google.png' alt='google icon' />
            <span>Sign in with Google</span>
          </button>
          <p className='text'>
            New Here ? <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .right {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .input {
    width: 85%;
    height: 35px;
    padding: 5px;
    margin: 5px 0;
    outline: none;
    border: 1px solid #2c444e;
    border-radius: 2px;
    font-size: 13px;
    @media (min-width: 1080px) {
      width: 50%;
    }
    @media (min-width: 720px) {
      width: 65%;
    }
  }

  .btn {
    font-size: 16px;
    font-weight: 500;
    padding: 12px 25px;
    color: white;
    border-radius: 12px;
    margin: 10px 0 0 0;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .text {
    font-size: 14px;
    color: #2c444e;
    margin: 5px 0;
    padding: 0;
  }

  .text > a {
    font-size: 16px;
    font-weight: 500;
    color: var(--clr-primary-7);
  }

  .google_btn {
    width: 230px;
    height: 40px;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: #2c444e;
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 20px 0;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .google_btn > img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
  .logo {
    width: 20%;
    margin-bottom: 1em;
  }

  .google_btn > span {
    margin-left: 10px;
  }
  .form_container {
    padding: 30px;
    box-shadow: var(--light-shadow);
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.2);
    width: 60%;
    display: grid;
    border: 2px solid rgba(0, 0, 0, 0.1);
    place-items: center;
    @media (max-width: 720px) {
      width: 95%;
    }
  }
`;

export default LoginPage;
