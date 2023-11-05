import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Country, State, City } from 'country-state-city';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { createShipping } from '../cartSlice';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { countryTypes } from '../../../types';
import { useAppDispatch } from '../../../App/hooks';
import { placeholderStyle, selectStyle } from '../../../utils/constants';

const BillingInfo = ({
  setStage,
}: {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [state, setState] = useState<(countryTypes & { stateCode: string })[]>(
    []
  );
  const [city, setCity] = useState<(countryTypes & { stateCode: string })[]>(
    []
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    countryCode: yup.string().required('Country Code is required'),
    phoneNumber: yup.string().required('Phone Number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    setValue,
    trigger,
  } = form;

  useEffect(() => {
    setStage(1);
    trigger(); // Trigger validation on component mount
  }, [setStage, trigger]);

  const countryArray = Country.getAllCountries().map((x) => ({
    value: x.name,
    label: x.name,
    countryCode: x.isoCode,
  }));

  const handleCountry = (selectedOption: SingleValue<countryTypes>) => {
    if (selectedOption) {
      const states = State.getStatesOfCountry(selectedOption.countryCode);
      const stateArray = states.map((x) => ({
        value: x.name,
        label: x.name,
        stateCode: x.isoCode,
        countryCode: x.countryCode,
      }));

      setValue('country', selectedOption.value, {
        shouldTouch: true,
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('countryCode', selectedOption.countryCode, {
        shouldTouch: true,
        shouldValidate: true,
        shouldDirty: true,
      });
      setState(stateArray);
      setValue('state', '');
      setValue('city', '');
    }
  };

  const handleState = (
    selectedOption: SingleValue<countryTypes & { stateCode: string }>
  ) => {
    if (selectedOption) {
      const cities = City.getCitiesOfState(
        selectedOption.countryCode,
        selectedOption.stateCode
      );
      const cityArray = cities.map((x) => ({
        value: x.name,
        label: x.name,
        stateCode: x.stateCode,
        countryCode: x.countryCode,
      }));

      setCity(cityArray);
      setValue('state', selectedOption.value, {
        shouldTouch: true,
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('city', '');
    }
  };

  const handleCity = (
    selectedOption: SingleValue<countryTypes & { stateCode: string }>
  ) => {
    if (selectedOption) {
      setValue('city', selectedOption.value, {
        shouldTouch: true,
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const onSubmit = (data: FieldValues) => {
    dispatch(createShipping(data));
    navigate('/checkout/shipping');
  };

  const onError = (errors: FieldErrors) => console.log('Form Errors', errors);

  return (
    <Wrapper className='flex-column' onSubmit={handleSubmit(onSubmit, onError)}>
      <h5 className='form-title zilla-500'>Contact Information</h5>
      <div className='form-name'>
        <input
          type='text'
          id='firstName'
          placeholder='Enter Firstname'
          {...register('firstName')}
        />

        <input
          type='text'
          id='lastName'
          placeholder='Enter Lastname'
          {...register('lastName')}
        />
        <input
          type='text'
          id='email'
          placeholder='Enter Email'
          {...register('email')}
        />

        <input
          type='phoneNumber'
          id='phoneNumber'
          placeholder='Enter Phone Number'
          {...register('phoneNumber')}
        />
      </div>
      <h5 className='form-title zilla-500'>Shipping Address</h5>
      <input
        type='text'
        id='address'
        placeholder='Enter Street Address'
        {...register('address')}
      />
      <Select
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
        options={countryArray}
        {...register('country')}
        onChange={handleCountry}
        noOptionsMessage={() => 'No Country Found'}
        placeholder='Enter Country'
        className='selectStyle'
        loadingMessage={() => 'loading...'}
        backspaceRemovesValue={true}
        isClearable={true}
      />
      <Select
        options={state}
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
        {...register('state')}
        onChange={handleState}
        noOptionsMessage={() => 'No State Found'}
        placeholder='Enter State'
        className='selectStyle'
        loadingMessage={() => 'loading...'}
        backspaceRemovesValue={true}
        isClearable={true}
      />
      <Select
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
        loadingMessage={() => 'loading...'}
        backspaceRemovesValue={true}
        isClearable={true}
        {...register('city')}
        onChange={handleCity}
        noOptionsMessage={() => 'No City Found'}
        placeholder='Enter City'
        className='selectStyle'
      />

      <button
        type='submit'
        className='btn place-center zilla-700'
        disabled={!isValid || isSubmitting}>
        NEXT
      </button>

      <DevTool control={control} />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 90%;

  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
  .form-title {
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    letter-spacing: 0.1em;
    margin-block: 0.75em;
  }
  .form-name {
    display: grid;
    grid-template-columns: repeat(2, 48%);
    justify-content: space-between;
  }
  input {
    letter-spacing: 0.05em;
    text-transform: capitalize;
  }
  .selectStyle {
    margin-block: 1em;
    width: 100%;
  }
  .btn {
    display: grid;
    margin-block: 1em;
  }
`;

export default BillingInfo;
