import { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AmountButtons from './AmountButtons';
import { addToCart } from '../../cartFeature/cartSlice';
import { SingleProductType } from '../../../types';
import { useAppDispatch } from '../../../App/hooks';

const AddToCart = ({ product }: { product: SingleProductType }) => {
  const { _id: id, stock } = product;
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState('');
  const dispatch = useAppDispatch();
  const notify = () => toast('Added to cart successfully');

  const increase = useCallback(() => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  }, [stock]);

  const decrease = useCallback(() => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  }, []);

  const handleClick = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSize(value);
  };

  return (
    <Wrapper className='size flex-column'>
      <AmountButtons increase={increase} decrease={decrease} amount={amount} />
      <div className='size-guide'>size guide</div>
      <select
        name='size'
        className='size-select'
        defaultValue={'none'}
        onChange={handleClick}>
        <option value='none' disabled>
          Select a Size
        </option>
        <option value='small'>Small</option>
        <option value='medium'>Medium</option>
        <option value='large'>Large</option>
        <option value='x-large'>X-Large</option>
        <option value='2x-large'>2x-large</option>
      </select>
      <button
        className='btn add-cart-btn zilla-700'
        onClick={() => {
          dispatch(addToCart({ id, amount, product, size }));
          notify();
        }}
        disabled={size ? false : true}>
        Add To Cart
      </button>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .size {
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
  }
  .size-guide {
    font-family: 'Bell MT';
    font-size: 18px;
    line-height: 20px;
    /* identical to box height */
    margin-left: auto;
    text-decoration-line: underline;
  }
  .size-select {
    padding: 31.5px 24px;
    gap: 15px;
    width: 100%;
    border: 1.5px solid black;
    // drop down arrow
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.5rem center;
    background-size: 1em;
    cursor: pointer;
  }
  .btn {
    gap: 15px;
    background: #000000;
    width: 100%;
    font-size: 24px;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      transform: scale(1.01);
    }
  }
  .add-cart-btn {
    &:disabled {
      background: rgba(0, 0, 0, 0.3);
      border: none;
    }
  }
`;
export default AddToCart;
