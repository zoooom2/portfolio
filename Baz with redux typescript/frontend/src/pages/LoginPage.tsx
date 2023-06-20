import styled from 'styled-components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import logo from '../assets/image 2.svg';
import GoogleButton from 'react-google-button';
import { jwtAuth, googleAuth } from '../features/userFeature/userSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { useEffect } from 'react';
axios.defaults.withCredentials = true;

const LoginPage = () => {
  const { authentication_error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters long'),
  });
  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const { register, control, setError, handleSubmit, formState, trigger } =
    form;
  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    // isSubmitted,
    isSubmitSuccessful,
  } = formState;

  const onSubmit = async (data: FieldValues) => {
    const response = await dispatch(jwtAuth([data.email, data.password]));

    if (!authentication_error) {
      const redirectTo = searchParams.get('redirectTo');

      if (redirectTo) {
        navigate(redirectTo);
      } else if (response.payload.user.role === 'admin') {
        navigate('/admin/overview');
      } else {
        navigate('/');
      }
    } else {
      setError('formError', { type: 'manual', message: authentication_error });
      setTimeout(() => {
        setError('formError', {
          type: 'manual',
          message: '',
        });
        trigger();
      }, 5000);
    }
  };
  const onError = (errors: FieldErrors) => {
    console.log('Form Errors', errors);
  };
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Wrapper className='page-100 section section-center'>
      <div className='form_container'>
        <div className='right flex-column place-center'>
          <img src={logo} alt='logo' className='logo' />

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {errors.formError?.message && (
              <p className='errormsg'>Something went wrong</p>
            )}
            <div className='form-control'>
              <input
                type='text'
                className='input email'
                placeholder='Email'
                {...register('email')}
              />
            </div>
            <div className='form-control'>
              <input
                type='password'
                className='input'
                placeholder='Password'
                {...register('password')}
              />
            </div>

            <button
              type='submit'
              className='btn place-center'
              disabled={!isDirty || !isValid || isSubmitting}>
              Log In
            </button>
            <DevTool control={control} />
          </form>
          <p className='text'>or</p>
          <GoogleButton onClick={() => dispatch(googleAuth())} />
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

  .input {
    width: 100%;
    margin-block: 10px;
  }
  .email {
    margin-top: 20px;
  }
  .btn {
    width: 100%;
    display: flex;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #2c444e;
    font-family: 'Bell-MT';
  }

  .errormsg {
    margin-bottom: 5px;
    color: #cc5151;
  }

  .text > a {
    font-size: 16px;
    font-weight: 500;
    color: var(--clr-primary-7);
  }

  form {
    width: 100%;
  }
  .form_container {
    padding: 30px;
    box-shadow: var(--light-shadow);
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.2);
    width: 40%;
    max-width: 500px;
    display: grid;
    border: 2px solid rgba(0, 0, 0, 0.1);
    place-items: center;
    @media (max-width: 900px) {
      width: 75%;
    }
    @media (max-width: 600px) {
      width: 95%;
    }
  }
`;

export default LoginPage;
