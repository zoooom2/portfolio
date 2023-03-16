import React, { useState } from 'react';
import styled from 'styled-components';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import { PageHero, StripeCheckout } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const CheckoutPage = () => {
  const { updateShipping, shippingInfo } = useCartContext();
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const country = Country.getAllCountries();
  let countryArray = [];
  country.forEach((x) =>
    countryArray.push({ value: x.name, label: x.name, countryCode: x.isoCode })
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

    if (name !== 'email') {
      if (e.target.value === '') {
        e.target.style.border = '1px solid red';
      } else {
        e.target.style.border = 'none';
      }
    }
    if (name === 'email') {
      /^[A-Z0-9. _%+-]+@[A-Z0-9. -]+\.[A-Z]{2,4}$/i.test(e.target.value)
        ? (e.target.style.border = 'none')
        : (e.target.style.border = '1px solid red');
    }
    updateShipping(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.streetAddress &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.country &&
      shippingInfo.phoneNumber &&
      shippingInfo.postCode &&
      /^[A-Z0-9. _%+-]+@[A-Z0-9. -]+\.[A-Z]{2,4}$/i.test(shippingInfo.email)
    ) {
      console.log('post');
    }
  };
  return (
    <main>
      <Wrapper className="page-100 section section-center">
        <div className="details">
          <h2 className="form-head scriptFont">beads by kaph</h2>
          <form className="shipping-details">
            <h5 className="form-title ">shipping details</h5>
            <div className="form-name">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter Firstname"
                value={shippingInfo.firstName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Lastname"
                value={shippingInfo.lastName}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter Street Address"
              value={shippingInfo.address}
              onChange={handleChange}
            />

            <Select
              options={countryArray}
              onChange={handleCountry}
              noOptionsMessage={() => 'No Country Found'}
              placeholder="Enter Country"
              className="selectStyle"
            />

            <Select
              options={state}
              onChange={handleState}
              noOptionsMessage={() => 'No State Found'}
              placeholder="Enter State"
              className="selectStyle"
            />

            <Select
              options={city}
              onChange={handleCity}
              noOptionsMessage={() => 'No State Found'}
              placeholder="Enter City"
              className="selectStyle"
            />

            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              value={shippingInfo.phoneNumber}
              onChange={handleChange}
            />

            <input
              type="postCode"
              name="postCode"
              id="postCode"
              placeholder="Enter Postal Code"
              value={shippingInfo.postCode}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={shippingInfo.email}
              onChange={handleChange}
            />

            <Link to="/pay" className="btn btn-link">
              PROCEED TO PAYMENT CHANNEL
            </Link>
          </form>
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
    background-color: rgba(0, 0, 0, 0.1);
    width: 60%;
    display: grid;
    place-items: center;
    @media (max-width: 720px) {
      width: 95%;
    }
  }
  input {
    margin-block: 1em;
    border: none;
    padding: 0.5em;
    font-size: 1em;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.8);
  }
  .selectStyle {
    margin-block: 1em;
    border: none;
  }
  .form-name {
    display: flex;
    justify-content: space-between;
    @media (max-width: 1080px) {
      flex-direction: column;
    }
  }
  .form-title {
    margin-block: 1em;
    text-transform: uppercase;
    color: purple;
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
`;
export default CheckoutPage;
