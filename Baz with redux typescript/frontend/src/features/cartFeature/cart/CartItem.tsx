import styled from 'styled-components';
import { priceFormat } from '../../../utils/constants';
import { removeItem, setAmount } from '../../cartFeature/cartSlice';
import { CartItemType } from '../../../types';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useAppDispatch } from '../../../App/hooks';

const CartItem = ({
  productID,
  image,
  productName,
  price,
  size,
  amount,
  max,
}: CartItemType) => {
  const dispatch = useAppDispatch();

  const handleChange = (
    e: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      let value = +e.target.value;
      value = value > max ? max : value;
      dispatch(setAmount({ id: productID, value, size }));
    }
  };

  const increase = () => {
    dispatch(
      setAmount({
        id: productID,
        value: amount + 1 > max ? max : amount + 1,
        size,
      })
    );
  };
  const decrease = () => {
    dispatch(
      setAmount({ id: productID, value: amount - 1 < 1 ? 1 : amount - 1, size })
    );
  };

  return (
    <Wrapper className='flex gap-[27px]'>
      <div className='flex-1 flex justify-between'>
        <img src={image} alt='' className='object-contain h-[249px] w-full' />
      </div>
      <div className='product-details flex-column'>
        <div className='flex flex-col'>
          <div className='font-baz2 text-[16px] max-tablet:font-semibold tracking-[1.6px] tablet:text-[21px] tablet:tracking-[2.1px]'>
            {productName}
          </div>
          <div className='text-[#6c6c6c] font-baz1 text-[10px] tablet:text-[16px] tracking-[1.5px] tablet:tracking-[2.1px] uppercase'>
            {size}
          </div>
        </div>

        <div className='font-baz1 text-[16px] tablet:text-[24px] font-semibold'>
          {priceFormat(price)}
        </div>
        <div className='quantityForm-remove flex-column'>
          <div className='quantityForm flex-column'>
            <label
              htmlFor='quantity'
              className='font-baz2 text-[12px] tablet:font-baz3 tablet:text-[15px] '>
              Quantity
            </label>
            <div className='flex gap-[8px]'>
              <button
                className='w-[24px] h-[24px] bg-baz-black text-baz-white flex items-center justify-center'
                onClick={decrease}>
                -
              </button>
              <input
                type='number'
                name='quantity'
                id='quantity'
                // placeholder={0}
                min={0}
                max={max}
                value={amount}
                className='w-[40px] h-[24px]'
                onChange={handleChange}
              />
              <button
                className='w-[24px] h-[24px] bg-baz-black text-baz-white grid place-items-center'
                onClick={increase}>
                +
              </button>
            </div>
          </div>
          <button
            className='remove-btn'
            onClick={() => dispatch(removeItem({ productID, size }))}>
            Remove
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  // gap: 2em;

  // .productImage {
  //   width: 50%;
  // }
  input {
    margin-block: 0;
  }
  .product-details {
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    gap: 10px;
  }
  .name-size {
    font-family: 'Zilla Slab';
    font-size: 21px;
    line-height: 25px;
    letter-spacing: 0.1em;
  }
  // .name {
  //   font-family: 'Bell-MT';
  //   font-size: 20px;
  //   line-height: 45px;
  //   text-transform: capitalize;
  // }

  // .price {
  //   font-family: 'Poppins';
  //   font-weight: 600;
  //   font-size: 24px;
  //   line-height: 36px;
  //   /* identical to box height */
  //   color: #000000;
  // }
  // label {
  //   font-family: 'Bell MT';
  // font-size: 15px;
  // line-height: 17px;
  // /* identical to box height */
  // color: #000000;
  // }
  .quantityForm-remove {
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
  }
  .quantityForm {
    align-items: flex-start;
    padding: 0px;
    gap: 6px;
  }
  .size {
    font-family: 'Bell MT';
    font-size: 15px;
    line-height: 27px;
    text-transform: capitalize;
  }
  .quantity {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 4.5px 7.5px;
    border: 1.5px solid #757575;
    border-radius: 1.5px;
    font-family: 'Bell MT';
    font-size: 24px;
    line-height: 27px;
    /* identical to box height */
    letter-spacing: 0.1em;
    // width: 50px;
  }
  .remove-btn {
    font-family: 'Bell MT';
    font-size: 15px;
    line-height: 17px;
    /* identical to box height */
    text-decoration-line: underline;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default CartItem;
