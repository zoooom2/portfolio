import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../assets/image 2.svg';
import { setClicked } from '../features/userFeature/userSlice';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../App/hooks';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    lastname: yup.string().required('Last name is required'),
    firstname: yup.string().required('First name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    dateOfBirth: yup
      .date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth must be in the past'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters long'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Password confirmation is required'),
  });
  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    // watch,
    // getValues,
    // setValue,
    // reset,
    // trigger,
  } = form;

  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    // isSubmitted,
    isSubmitSuccessful,
  } = formState;

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post('/api/v1/users/signup', data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (errors: FieldErrors) => console.log('Form Errors', errors);

  // const onReset = () => reset();

  // const handleGetValues = () =>
  //   console.log('Get Values', getValues('username'));
  // const handleSetValues = () =>
  //   console.log(
  //     'Set Values',
  //     setValue('username', '', {
  //       shouldValidate: true,
  //       shouldDirty: true,
  //       shouldTouch: true,
  //     })
  //   );

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     // reset();
  //   }
  // }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    dispatch(setClicked(true));
  }, []);

  return (
    <main>
      <Wrapper className='page-100 section section-center'>
        <div className='details'>
          <img src={logo} alt='logo' />
          <form
            className='shipping-details'
            onSubmit={handleSubmit(onSubmit, onError)}>
            <h5 className='form-title zilla-700'>Sign Up</h5>
            <div className='form-name'>
              <div className='form-control'>
                <input
                  type='text'
                  id='firstname'
                  placeholder='Enter First Name'
                  {...register('firstname')}
                />
                <p className='error'>{String(errors.firstname?.message)}</p>
              </div>
              <div className='form-control'>
                <input
                  type='text'
                  id='lastname'
                  placeholder='Enter Last Name'
                  {...register('lastname')}
                />
                <p className='error'>{String(errors.lastname?.message)}</p>
              </div>
            </div>
            <div className='form-control'>
              <input
                type='username'
                id='username'
                placeholder='Enter User Name'
                {...register('username')}
              />
              <p className='error'>{String(errors.username?.message)}</p>
            </div>
            <div className='form-control'>
              <input
                type='email'
                id='email'
                placeholder='Enter Email'
                {...register('email', {
                  validate: async (fieldValue: string) => {
                    const response = await axios.get(
                      `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                    );
                    const data = response.data;
                    return data.length === 0 || 'Email already exists';
                  },
                })}
              />
              <p className='error'>{String(errors.email?.message)}</p>
            </div>
            <div className='form-control'>
              <input
                type='date'
                {...register('dateOfBirth', {
                  required: { value: true, message: 'Enter Date of Birth' },
                })}
              />
              <p className='error'>{String(errors.dateOfBirth?.message)}</p>
            </div>
            <div className='form-control'>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                {...register('password', {
                  required: { value: true, message: 'Please enter password' },
                })}
              />
              <p className='error'>{String(errors.password?.message)}</p>
            </div>
            <div className='form-control'>
              <input
                type='password'
                id='passwordConfirm'
                placeholder='Confirm Password'
                {...register('passwordConfirm')}
              />
              <p className='error'>{String(errors.passwordConfirm?.message)}</p>
            </div>
            <button
              className='btn btn-link'
              disabled={!isDirty || !isValid || isSubmitting}>
              Register
            </button>
            {!isSubmitSuccessful && (
              <p>Something Wrong Happened. Please try again</p>
            )}
          </form>
          <DevTool control={control} />
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-head {
    color: black !important;
  }
  .shipping-details {
    display: flex;
    flex-direction: column;
    width: 80%;
    @media (max-width: 768px) {
      width: 90%;
    }
    @media (max-width: 480) {
      width: 100%;
    }
  }
  .details {
    padding: 30px;
    box-shadow: var(--light-shadow);
    border-radius: var(--radius);

    width: 60%;
    display: grid;
    place-items: center;
    @media (max-width: 720px) {
      width: 95%;
    }
  }
  .details input {
    border: 1px solid black;
  }
  .selectStyle {
    margin-block: 1em;
    border: none;
  }
  .form-name {
    display: flex;

    gap: 4%;
    input {
      width: 48%;
    }

    @media (max-width: 1080px) {
      flex-direction: column;
      input {
        width: 100%;
      }
    }
  }
  .form-title {
    margin-block: 1em;
    text-transform: uppercase;
  }

  .btn {
    padding-block: 1em;
    margin-top: 1em;
    font-size: 0.75em;
  }
  .btn-link {
    display: grid;
    place-items: center;
  }
  p {
    color: red;
    font-size: 12px;
    font-family: monospace;
    margin-top: 5px;
  }
`;

export default Signup;
