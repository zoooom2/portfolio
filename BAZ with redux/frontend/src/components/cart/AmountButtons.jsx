import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AmountButtons = ({ increase, decrease, amount }) => {
  return (
    <Wrapper className='amount-btns'>
      <button
        type='button'
        className='amount-btn place-center'
        onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className='amount'>{amount}</h2>
      <button
        type='button'
        className='amount-btn place-center'
        onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

AmountButtons.propTypes = {
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
