import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/image 2.svg';
import { useUserContext } from '../context/user_context';
axios.defaults.withCredentials = true;

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { jwtAuth, googleAuth } = useUserContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };
  return (
    <Wrapper className='page-100 section section-center'>
      <div className='form_container'>
        <div className='right flex-column place-center'>
          <img src={logo} alt='logo' className='logo' />
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
            className='btn place-center'
            onClick={() => jwtAuth(credentials.email, credentials.password)}>
            Log In
          </button>
          <p className='text'>or</p>
          <button className='btn zilla-500 place-center' onClick={googleAuth}>
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
    width: 80%;

    @media (min-width: 1080px) {
      width: 50%;
    }
    @media (min-width: 720px) {
      width: 65%;
    }
  }

  .input {
    width: 100%;
    margin-block: 10px;
  }

  .btn {
    width: 100%;
    display: flex;
  }

  .text {
    font-size: 14px;
    color: #2c444e;
    font-family: 'Bell-MT';
  }

  .text > a {
    font-size: 16px;
    font-weight: 500;
    color: var(--clr-primary-7);
  }

  .btn {
    margin: 0 0 20px 0;
    display: flex;
    position: relative;
    gap: 1em;
  }

  .btn > img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    background: transparent;
  }
  .logo {
    width: 20%;
    margin-bottom: 1em;
  }

  .btn > span {
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
