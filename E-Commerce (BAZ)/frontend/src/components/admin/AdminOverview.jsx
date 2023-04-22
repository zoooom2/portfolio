import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { useAdminContext } from '../../context/admin_context';
import { adminAnalytics, periodOption } from '../../utils/constants';
import { MdKeyboardArrowDown } from 'react-icons/md';

const AdminOverview = () => {
  const { user } = useUserContext();
  const { fetchTotalRevenue } = useAdminContext();
  const options = periodOption.map((option, i) => (
    <option key={i} value={option.value}>
      {option.name}
    </option>
  ));

  const analytics = adminAnalytics.map((x, i) => (
    <div className={x.topic} key={i}>
      <div className='top'>
        <div className='logo'>{x.logo}</div>
        <div className='detail'>
          <div className='detail-name'>{x.topic}</div>
          <div className='detail-value'></div>
        </div>
      </div>
      <div className='bottom'>
        <span></span>
      </div>
    </div>
  ));

  useEffect(() => fetchTotalRevenue, []);

  return (
    <Wrapper>
      <div className='hero'>
        <div className='welcome'>Welcome back, {user.name}</div>
        <div className='period'>
          <select name='period' id='period'>
            {options}
          </select>
          <label htmlFor='period'>
            <MdKeyboardArrowDown />
          </label>
        </div>
      </div>
      <div className='hero_body'>
        <div className='analysis'>
          <div className='totalRevenue'></div>
          <div className='totalOrders'></div>
          <div className='visitors'></div>
          <div className='totalItemSold'></div>
        </div>
        <div className='order-sales'></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5em;
    width: 100%;
    border-bottom: 1px solid #b6b6b6;
    .welcome {
      font-family: 'Poppins';
      font-weight: 500;
      font-size: 32px;
      line-height: 48px;
    }
    .period {
      display: flex;
      height: 48px;
      align-items: center;
      gap: 5px;
      &:focus {
        border: 1px solid black;
      }
    }
  }
  label {
    font-size: 25px;
    display: flex;
  }
  select {
    border: none;
    font-family: 'Poppins';
    font-size: 20px;
    line-height: 30px;
    text-transform: capitalize;
    cursor: pointer;
    appearance: none;
    padding-left: 0.5em;
    &:focus {
      border: none;
      outline: none;
    }
    option {
      font-size: 13px;
      cursor: pointer;
    }
  }
`;

export default AdminOverview;
