import { MdKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';
import { periodOption } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { changeTimeRange } from '../../features/adminFeature/adminSlice';

const AdminHero = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { period } = useSelector((state) => state.admin);
  const options = periodOption.map((option, i) => (
    <option key={i} value={option.value}>
      {option.name}
    </option>
  ));
  const changePeriod = (e) => {
    const value = e.target.value;
    dispatch(changeTimeRange(value));
  };
  return (
    <Wrapper className='hero'>
      <div className='welcome'>Welcome back, {user.name}</div>
      <div className='period'>
        <select
          name='period'
          id='period'
          value={period}
          onChange={changePeriod}>
          {options}
        </select>
        <label htmlFor='period'>
          <MdKeyboardArrowDown />
        </label>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
export default AdminHero;
