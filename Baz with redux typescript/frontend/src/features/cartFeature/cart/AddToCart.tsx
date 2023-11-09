import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AmountButtons from './AmountButtons';
import { addToCart } from '../../cartFeature/cartSlice';
import { SingleProductType } from '../../../types';
import { useAppDispatch } from '../../../App/hooks';

const AddToCart = ({ product }: { product: SingleProductType }) => {
  const {
    _id: id,
    // stock
  } = product;
  const [amount, _setAmount] = useState(1);
  const [size, setSize] = useState('');
  const dispatch = useAppDispatch();

  // const increase = useCallback(() => {
  //   setAmount((oldAmount) => {
  //     let tempAmount = oldAmount + 1;
  //     if (tempAmount > stock) {
  //       tempAmount = stock;
  //     }
  //     return tempAmount;
  //   });
  // }, [stock]);

  // const decrease = useCallback(() => {
  //   setAmount((oldAmount) => {
  //     let tempAmount = oldAmount - 1;
  //     if (tempAmount < 1) {
  //       tempAmount = 1;
  //     }
  //     return tempAmount;
  //   });
  // }, []);

  const handleClick = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSize(value);
  };

  return (
    <Wrapper className='size flex-column'>
      {/* <AmountButtons increase={increase} decrease={decrease} amount={amount} /> */}
      <div className='flex flex-col gap-[16px] w-full'>
        <div className='size-guide'>size guide</div>
        <select
          name='size'
          className='size-select py-[21px] px-[16px] tablet:py-[31.5px] tablet:px-[24px] bg-baz-white'
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
      </div>

      <button
        className='capitalize cursor-pointer add-cart-btn py-[20px] font-baz2 text-[16px] font-semibold tablet:py-[30px] w-full tablet:font-bold tablet:text-[24px] bg-baz-white text-baz-black'
        onClick={() => {
          dispatch(addToCart({ id, amount, product, size }));
        }}
        disabled={size ? false : true}>
        Add To Cart
      </button>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        style={{ fontFamily: 'Poppins', textAlign: 'center' }}
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
    gap: 15px;
    width: 100%;

    // drop down arrow
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.5rem center;
    background-size: 1em;
    cursor: pointer;
  }

  .add-cart-btn {
    &:hover {
      transform: scale(1.01);
    }
    &:disabled {
      background: rgba(0, 0, 0, 0.3);
      border: none;
    }
  }
`;
export default AddToCart;
