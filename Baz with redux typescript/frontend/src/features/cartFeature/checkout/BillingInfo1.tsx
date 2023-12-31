import { State } from 'country-state-city';
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import Select, { SingleValue } from 'react-select';
import { countryTypes } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import {
  placeholderStyle,
  selectStyle,
  shippingChart,
} from '../../../utils/constants';
import styled from 'styled-components';
import FormInput from '../../../global_components/FormInput';
import { updateCartTotal, updateShipping } from '../cartSlice';
import { CartSummary } from '../cart';
import FormTextArea from '../../../global_components/FormTextArea';

const BillingInfo = ({
  setStage,
}: {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    setStage(1);
  }, [setStage]);

  const { shippingInfo } = useAppSelector((state) => state.cart);

  const [selectedState, setSelectedState] = useState<SingleValue<
    countryTypes & { stateCode: string }
  > | null>(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showError]);

  const stateArray = State.getStatesOfCountry('NG').map((x) => ({
    value: x.name,
    label: x.name,
    stateCode: x.isoCode,
    countryCode: x.countryCode,
  }));

  const handleState = (
    selectedOption: SingleValue<countryTypes & { stateCode: string }>
  ) => {
    if (selectedOption) {
      dispatch(updateShipping({ detail: 'state', info: selectedOption.value }));
      dispatch(
        updateShipping({
          detail: 'shippingFee',
          info: shippingChart[selectedOption.value.toLowerCase()],
        })
      );
      dispatch(updateCartTotal());
      setSelectedState(selectedOption);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, validity } = e.target;

    if (validity.valid) setIsFormValid(true);

    dispatch(updateShipping({ detail: name, info: value }));
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
      const element = formElements[i] as HTMLInputElement | HTMLTextAreaElement;

      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        if (!element.validity.valid) {
          setIsFormValid(false);
          setShowError(true);
          console.log('form is not valid');
          return; // Stop checking if any field is invalid
        }
      }
    }

    if (!selectedState?.value) setShowError(true);

    // If all fields are valid, navigate to the next stage
    if (selectedState?.value && isFormValid) navigate('/checkout/payment');
  };

  return (
    <FormWrapper className='border-b border-black w-full px-[35px] flex flex-col gap-[75px] py-[54px]'>
      <div className='flex flex-col gap-8'>
        <div
          className={`text-[#ed0000] font-baz1 text-[12px] tablet:text-[19px] ${
            !showError && 'hidden'
          }`}>
          *Complete filling the information
        </div>
        <h3 className='font-baz2 text-[16px] tablet:text-[24px] tablet:tracking-[2.4px] font-medium tracking-[1.6px]'>
          Contact Information
        </h3>
        <div className='grid grid-cols-2 gap-x-[16px] tablet:gap-x-[34px] gap-y-4'>
          <FormInput
            type='text'
            name='firstName'
            placeholder='Firstname'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={shippingInfo.firstName}
            onChange={onChange}
            required
          />

          <FormInput
            type='text'
            name='lastName'
            placeholder='Lastname'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={shippingInfo.lastName}
            required
            onChange={onChange}
          />

          <FormInput
            type='email'
            onChange={onChange}
            name='email'
            placeholder='Email Address'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={shippingInfo.email}
            required
          />

          <FormInput
            type='tel'
            onChange={onChange}
            name='phoneNumber'
            placeholder='Phone Number'
            value={shippingInfo.phoneNumber}
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            // pattern={/(234)[0-9]{9}/}
            required
          />
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        <h3 className='font-baz2 text-[16px] tablet:text-[24px] tablet:tracking-[2.4px] font-medium tracking-[1.6px]'>
          Shipping Address
        </h3>
        <div className='flex flex-col gap-y-4'>
          <FormInput
            onChange={onChange}
            type='text'
            placeholder='Address'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            name='address'
            value={shippingInfo.address}
            required
          />

          <div className='grid grid-cols-2 gap-x-[16px] tablet:gap-x-[34px]'>
            <Select
              options={stateArray}
              styles={{
                placeholder: (defaultStyles) => {
                  return {
                    ...defaultStyles,
                    ...placeholderStyle,
                  };
                },

                control: (baseStyles) => ({
                  ...baseStyles,
                  ...selectStyle,
                }),
              }}
              noOptionsMessage={() => 'No State Found'}
              placeholder='State'
              className='selectStyle'
              loadingMessage={() => 'loading...'}
              backspaceRemovesValue={true}
              isClearable={true}
              onChange={handleState}
            />

            <FormInput
              type='text'
              name='city'
              placeholder='City'
              className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
              value={shippingInfo.city || ''}
              required
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        <h3 className='font-baz2 text-[16px] tablet:text-[24px] tablet:tracking-[2.4px] font-medium tracking-[1.6px]'>
          Additional Information (Optional)
        </h3>

        <FormTextArea
          name='additionalInfo'
          id='aInfo'
          placeholder='Add additional note to your order'
          onChange={onChange}
          value={shippingInfo.additionalInfo || ''}
        />
      </div>
      <button
        onClick={handleSubmit}
        className='hover:bg-baz-black hover:text-white py-[20px] tablet:py-[30px] border-[1.5px] border-black font-baz1 text-[16px] tablet:text-[24px] tracking-wide font-bold'>
        NEXT
      </button>
      <CartSummary />
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  input:invalid[data-focused='true'] {
    border: 1px solid red;
  }
`;
export default BillingInfo;
