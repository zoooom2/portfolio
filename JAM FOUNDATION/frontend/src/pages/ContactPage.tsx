import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import FormInput from '../global_components/FormInput';

const ContactPage = () => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [showError, setShowError] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    chat: '',
  });

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
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = (
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
    if (isFormValid) console.log('submitted succesfully');
  };

  return (
    <div className='tablet:p-[64px] px-[16px]  min-h-screen mt-[80px] gap-[93px] flex flex-col bg-white'>
      <div className='font-satoshi text-[#01248c] text-[38px] font-medium leading-[44.5px] underline underline-offset-[12px]'>
        ContactPage
      </div>
      <div className='flex gap-[32px] max-tablet:flex-col'>
        <form className='flex flex-col gap-[22px] w-4/5 max-tablet:w-full'>
          <div
            className={`text-[#ed0000] font-baz1 text-[12px] tablet:text-[19px] ${
              !showError && 'hidden'
            }`}>
            *Complete filling the information
          </div>
          <FormInput
            type='text'
            name='name'
            label='Name'
            id='name'
            className='w-full text-[10px] px-[16px] tablet:text-[15px]'
            value={contactData.name}
            onChange={onChange}
            required
          />
          <FormInput
            type='text'
            name='phone'
            id='phone'
            label='Phone Number'
            className='w-full text-[10px]  px-[16px] tablet:text-[15px]'
            value={contactData.phone}
            onChange={onChange}
            required
          />
          <FormInput
            type='text'
            name='email'
            label='email'
            id='email'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={contactData.email}
            onChange={onChange}
            required
          />
          <div className='flex flex-col'>
            <label
              htmlFor='chat'
              className='font-poppins text-[#01248c] text-[24px] font-medium'>
              Lets Talk
            </label>
            <textarea
              name='chat'
              id='chat'
              cols={30}
              rows={10}
              value={contactData.chat}
              onChange={onChange}
              className='bg-[#f2f4f7] p-[18px] text-black'
              required
            />
          </div>

          <button
            type='submit'
            className='py-[8px] px-[14px] w-fit text-[14px] font-inter text-[#01248c] font-extrabold leading-[20px] '
            onClick={handleSubmit}>
            submit
          </button>
        </form>
        <div className='bg-[#01248c] py-[24px] px-[10px] gap-[32px] text-[#fcfcfd] font-satoshi font-medium text-[16px] tablet:text-[20px]  laptop:text-[28px] flex flex-col h-fit leading-[28px]'>
          <div>0803462901</div>
          <div>Jamfoundation@info.com</div>
          <div>20 Aba Close off Lokoja Street Area 8 Garki Abuja FCT</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
