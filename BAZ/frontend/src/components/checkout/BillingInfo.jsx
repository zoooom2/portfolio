import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { placeholderStyle, selectStyle } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { updateShipping } from '../../features/cartFeature/cartSlice';

const BillingInfo = ({ setStage, shippingInfo }) => {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const dispatch = useDispatch();
  // const { shippingInfo } = useSelector((state) => state.cart);

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
    dispatch(updateShipping({ detail: 'state', info: '' }));
    dispatch(updateShipping({ detail: 'city', info: '' }));
    dispatch(updateShipping({ detail: 'country', info: selectedOption.value }));
    dispatch(
      updateShipping({
        detail: 'countryCode',
        info: selectedOption.countryCode,
      })
    );
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
    dispatch(updateShipping({ detail: 'state', info: selectedOption.value }));
  };

  const handleCity = (selectedOption) => {
    dispatch(updateShipping({ detail: 'city', info: selectedOption.value }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(updateShipping({ detail: name, info: value }));
  };
  return (
    <Wrapper className='flex-column'>
      <h5 className='form-title zilla-500'>Contact Information</h5>
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
      <h5 className='form-title zilla-500'>shipping Address</h5>
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
          control: (baseStyles) => ({
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
          control: (baseStyles) => ({
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
          control: (baseStyles) => ({
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
      <Link to='/checkout/shipping' className='btn place-center zilla-700'>
        NEXT
      </Link>
    </Wrapper>
  );
};

BillingInfo.propTypes = {
  setStage: PropTypes.func.isRequired,
  shippingInfo: PropTypes.object.isRequired,
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
