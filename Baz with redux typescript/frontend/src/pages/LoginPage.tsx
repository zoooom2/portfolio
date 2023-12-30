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
import { BAZLogo } from '../utils/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginPage = () => {
  const { authentication_error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const [isFormValid, setIsFormValid] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showError]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    // If all fields are valid, navigate to the next stage
    if (isFormValid) {
      await dispatch(jwtAuth([credentials.email, credentials.password]));

      if (!authentication_error) {
        const redirectTo = searchParams.get('redirectTo');

        if (redirectTo) {
          navigate(redirectTo);
        } else {
          navigate('/admin/overview');
        }
      }
    }
  };

  return (
    <div className='bg-baz-white flex w-full justify-center px-5  items-center h-screen'>
      <form
        className='bg-opacity-60 border border-gray-200 bg-clip-padding h-fit w-full tablet:w-1/2 laptop:w-1/3 flex flex-col gap-[48px] justify-center tablet:p-12  px-4 py-10 bg-baz-white shadow-lg rounded-3xl'
        style={{ backdropFilter: '20px' }}>
        <div className='w-full justify-center flex h-[100px]'>
          <img src={BAZLogo} alt='Logo' className='object-contain' />
        </div>
        <div className='flex flex-col gap-[24px]'>
          <div
            className={`text-[#ed0000] font-baz1 text-[12px] ${
              !showError && 'hidden'
            }`}>
            *Complete filling the information
          </div>
          <FormInput
            type='email'
            name='email'
            className=''
            placeholder='Email'
            value={credentials.email}
            onChange={onChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            className=''
            placeholder='password'
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          className='hover:bg-baz-black hover:text-white py-[20px] border-[1.5px] border-black font-baz1 text-[16px] tracking-wide font-bold capitalize'>
          submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
