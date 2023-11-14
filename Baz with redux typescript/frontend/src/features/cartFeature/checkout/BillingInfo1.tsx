import {
  // City,
  State,
} from 'country-state-city';
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

const BillingInfo = ({
  setStage,
}: {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    setStage(1);
  }, [setStage]);

  const { shippingInfo } = useAppSelector((state) => state.cart);

  // const [city, setCity] = useState<(countryTypes & { stateCode: string })[]>(
  //   []
  // );
  // const [selectedCity, setSelectedCity] = useState<
  //   (countryTypes & { stateCode: string }) | null
  // >(null);
  const [selectedState, setSelectedState] = useState<SingleValue<
    countryTypes & { stateCode: string }
  > | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
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
      // const cities = City.getCitiesOfState(
      //   selectedOption.countryCode,
      //   selectedOption.stateCode
      // );
      // const cityArray = cities.map((x) => ({
      //   value: x.name,
      //   label: x.name,
      //   stateCode: x.stateCode,
      //   countryCode: x.countryCode,
      // }));
      // setCity(cityArray);
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

  // const handleCity = (
  //   selectedOption: SingleValue<countryTypes & { stateCode: string }>
  // ) => {
  //   if (selectedOption) {
  //     dispatch(updateShipping({ detail: 'city', info: selectedOption.value }));
  //     setSelectedCity(selectedOption);
  //   }
  // };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = e.target;

    if (!validity.valid) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }

    dispatch(updateShipping({ detail: name, info: value }));
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (
      isFormValid &&
      // selectedCity &&
      selectedState
    ) {
      navigate('/checkout/payment');
    } else {
      setShowError(true);
      console.log('form is not valid');
    }
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
            value={shippingInfo.firstName || null}
            onChange={onChange}
            required
          />

          <FormInput
            type='text'
            name='lastName'
            placeholder='Lastname'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={shippingInfo.lastName || null}
            required
            onChange={onChange}
          />

          <FormInput
            type='email'
            onChange={onChange}
            name='email'
            placeholder='Email Address'
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            value={shippingInfo.email || null}
            required
          />

          <FormInput
            type='number'
            onChange={onChange}
            name='phoneNumber'
            placeholder='Phone Number'
            value={shippingInfo.phoneNumber}
            className='w-full text-[10px] font-baz1 px-[16px] tablet:text-[15px]'
            // pattern='^(\+\d{1,2}\s?)?(\()?((\+234)|(0))[789][01]\d{8}(\))?[\s.\-]?\d{3}[\s.\-]?\d{4}$'
            // required
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
            {/* <Select
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
              options={city}
              onChange={handleCity}
              noOptionsMessage={() => 'No Country Found'}
              placeholder='City'
              className='selectStyle'
              loadingMessage={() => 'loading...'}
              backspaceRemovesValue={true}
              isClearable={true}
            /> */}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        <h3 className='font-baz2 text-[16px] tablet:text-[24px] tablet:tracking-[2.4px] font-medium tracking-[1.6px]'>
          Additional Information (Optional)
        </h3>

        <textarea
          name='additional-info'
          id='a-info'
          placeholder='Add additional note to your order'
          cols={30}
          rows={5}
          className='w-full border border-[#a6a6a6] px-[16px] py-[11px] font-baz1 text-[10px] text-black tablet:text-[15px] bg-transparent'></textarea>
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
