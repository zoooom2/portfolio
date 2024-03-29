import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import AmountButtons from './AmountButtons';
import { useCartContext } from '../context/contextHooks';
import { SingleProductType } from '../types';

const AddToCart = ({
  product,
  size,
}: {
  product: SingleProductType;
  size: number;
}) => {
  const { addToCart } = useCartContext();
  const { id, stock, color } = product;
  const [mainColor, setMainColor] = useState(color[0]);
  const [amount, setAmount] = useState(1);

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

  return (
    <Wrapper>
      <div className='colors'>
        <span>colors :</span>
        <div>
          {color.map((clr, index) => {
            return (
              <button
                key={index}
                style={{ background: clr }}
                className={`${
                  mainColor === clr ? 'color-btn active' : 'color-btn'
                }`}
                onClick={() => setMainColor(clr)}>
                {mainColor === clr ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />
      </div>
      <Link
        to='/cart'
        className='btn'
        onClick={() => addToCart(id, mainColor, amount, product, size)}>
        add to cart
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
