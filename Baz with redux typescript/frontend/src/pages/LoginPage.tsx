import styled from 'styled-components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import logo from '../assets/image 2.svg';
import { jwtAuth, googleAuth } from '../features/userFeature/userSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
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

  const { register, control, handleSubmit, formState } = form;
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
    }
  };
  const onError = (errors: FieldErrors) => {
    console.log('Form Errors', errors);
  };

  return (
    <Wrapper className='page-100 section section-center'>
      <div className='form_container'>
        <div className='right flex-column place-center'>
          <img src={logo} alt='logo' className='logo' />

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {!isSubmitSuccessful && <h5>incorrect email/password</h5>}
            <div className='form-control'>
              <input
                type='text'
                className='input'
                placeholder='Email'
                {...register('email')}
              />
              <p className='error'>{String(errors.email?.message || '')}</p>
            </div>
            <div className='form-control'>
              <input
                type='password'
                className='input'
                placeholder='Password'
                {...register('password')}
              />
              <p className='error'>{String(errors.password?.message)}</p>
            </div>

            <button
              className='btn place-center'
              disabled={!isDirty || !isValid || isSubmitting}>
              Log In
            </button>
            <DevTool control={control} />
          </form>
          <p className='text'>or</p>
          <button
            className='btn zilla-500 place-center'
            onClick={() => dispatch(googleAuth())}>
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
