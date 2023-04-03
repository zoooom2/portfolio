import React, { useState } from 'react';
import styled from 'styled-components';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import { useCartContext } from '../context/cart_context';

import { placeholderStyle, selectStyle } from '../utils/constants';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const BillingInfo = ({ setStage }) => {
  const { updateShipping, shippingInfo } = useCartContext();
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    setStage(1);
  }, []);

  const country = Country.getAllCountries();
  let countryArray = [];
  country.forEach((x) =>
    countryArray.push({
      value: x.name,
      label: x.name,
      countryCode: x.isoCode,
    })
  );

  const handleCountry = (selectedOption) => {
    let states = State.getStatesOfCountry(selectedOption.countryCode);
    let stateArray = [];
    states.forEach((x) =>
      stateArray.push({
        value: x.name,
        label: x.name,
        stateCode: x.isoCode,
        countryCode: x.countryCode,
      })
    );
    setState([...stateArray]);
    updateShipping('state', '');
    updateShipping('city', '');
    updateShipping('country', selectedOption.value);
    updateShipping('countryCode', selectedOption.countryCode);
  };

  const handleState = (selectedOption) => {
    let cities = City.getCitiesOfState(
      selectedOption.countryCode,
      selectedOption.stateCode
    );
    let cityArray = [];
    cities.forEach((x) =>
      cityArray.push({
        value: x.name,
        label: x.name,
        stateCode: x.isoCode,
        countryCode: x.countryCode,
      })
    );

    setCity([...cityArray]);
    updateShipping('state', selectedOption.value);
  };

  const handleCity = (selectedOption) => {
    updateShipping('city', selectedOption.value);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updateShipping(name, value);
  };
  return (
    <Wrapper>
      <h5 className='form-title'>Contact Information</h5>
      <div className='form-name'>
        <input
          type='text'
          name='firstName'
          id='firstName'
          placeholder='Enter Firstname'
          value={shippingInfo.firstName}
          onChange={handleChange}
        />

        <input
          type='text'
          name='lastName'
          id='lastName'
          placeholder='Enter Lastname'
          value={shippingInfo.lastName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='email'
          id='email'
          placeholder='Enter Email'
          value={shippingInfo.email}
          onChange={handleChange}
        />

        <input
          type='phoneNumber'
          name='phoneNumber'
          id='phoneNumber'
          placeholder='Enter Phone Number'
          value={shippingInfo.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <h5 className='form-title'>shipping Address</h5>
      <input
        type='text'
        name='address'
        id='address'
        placeholder='Enter Street Address'
        value={shippingInfo.address}
        onChange={handleChange}
      />
      <Select
        styles={{
          placeholder: (defaultStyles) => {
            return {
              ...defaultStyles,
              ...placeholderStyle,
            };
          },
          control: (baseStyles, state) => ({
            ...baseStyles,
            ...selectStyle,
          }),
        }}
        options={countryArray}
        onChange={handleCountry}
        noOptionsMessage={() => 'No Country Found'}
        placeholder='Enter Country'
        className='selectStyle'
        value={
          shippingInfo.country && {
            value: shippingInfo.country,
            label: shippingInfo.country,
          }
        }
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
          control: (baseStyles, state) => ({
            ...baseStyles,
            ...selectStyle,
          }),
        }}
        onChange={handleState}
        noOptionsMessage={() => 'No State Found'}
        placeholder='Enter State'
        className='selectStyle'
        value={
          shippingInfo.state && {
            value: shippingInfo.state,
            label: shippingInfo.state,
          }
        }
      />
      <Select
        styles={{
          placeholder: (defaultStyles) => {
            return {
              ...defaultStyles,
              ...placeholderStyle,
            };
          },
          control: (baseStyles, state) => ({
            ...baseStyles,
            ...selectStyle,
          }),
        }}
        options={city}
        onChange={handleCity}
        noOptionsMessage={() => 'No State Found'}
        placeholder='Enter City'
        className='selectStyle'
        value={
          shippingInfo.city && {
            value: shippingInfo.city,
            label: shippingInfo.city,
          }
        }
      />
      <Link to='/checkout/shipping' className='payment-btn'>
        NEXT
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;

  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
  .form-title {
    font-family: 'Zilla Slab';
    font-weight: 500;
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
    margin-block: 1em;
    border: 1.5px solid #a6a6a6;
    padding: 18px;
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 10px;
    line-height: 22px;
    color: black;
    background: transparent;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    &::placeholder {
      color: black;
      font-size: 10px;
    }
  }
  .selectStyle {
    margin-block: 1em;
    width: 100%;
  }
  .payment-btn {
    padding: 1em;
    border: 1px solid black;
    display: grid;
    place-items: center;
    color: black;
    margin-block: 1em;
    background: transparent;
    transition: var(--transition);
    font-family: 'Zilla Slab';
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export default BillingInfo;
