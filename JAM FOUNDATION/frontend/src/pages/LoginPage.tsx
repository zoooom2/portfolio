import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import FormInput from '../global_components/FormInput';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { jwtAuth } from '../features/userFeature/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [isFormValid, setIsFormValid] = useState(true);
  const [showError, setShowError] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { authentication_error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showError]);

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, validity } = e.target;

    if (validity.valid) setIsFormValid(true);
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // Get all form elements
    const form = e.currentTarget.form;
    if (!form) {
      console.error('Form not found');
      return;
    }

    const formElements = form.elements;

    // Check validity for each form element
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;

      if (element instanceof HTMLInputElement) {
        if (!element.validity.valid) {
          setIsFormValid(false);
          setShowError(true);
          console.log('form is not valid');
          return; // Stop checking if any field is invalid
        }
      }
    }

    setShowError(true);

    // If all fields are valid, navigate to the next stage
    if (isFormValid) {
      try {
        await dispatch(jwtAuth([credentials.email, credentials.password]));

        const redirectTo = searchParams.get('redirectTo');
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          navigate('/admin/articles');
        }
      } catch (error) {
        console.log(authentication_error);
      }
    }
  };

  return (
    <div className='font-satoshi flex flex-col mt-[80px] laptop:py-[48px] tablet:py-[42px] py-[24px] gap-6 items-center justify-center'>
      <div className=' justify-center flex w-full flex-col items-center'>
        <form className='rounded-[12px] flex flex-col laptop:gap-9 tablet:gap-7 gap-4 laptop:w-1/2 tablet:w-2/3 bg-[#01248c] w-11/12 p-5 tablet:py-10  tablet:px-10 laptop:py-10 laptop:px-[120px]'>
          <div className='text-[#fff] text-[28px]'>Login</div>
          <FormInput
            labelColor='text-white'
            type='text'
            name='email'
            label='email'
            id='email'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={credentials.email}
            onChange={onChange}
            required
          />
          <FormInput
            labelColor='text-white'
            type='password'
            name='password'
            label='password'
            id='password'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={credentials.password}
            onChange={onChange}
            required
          />
          <button className='w-fit bg-white text-black' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
