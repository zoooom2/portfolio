import styled from 'styled-components';
import CartItem from './CartItem';
import CartTotals from './CartTotals';
import { useAppSelector } from '../../../App/hooks';

const CartContent = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <Wrapper className='cart-container'>
      <section className='cartContent'>
        {cart.map((item, index) => (
          <section
            key={index}
            className='column-cart border-b border-baz-black'>
            <CartItem {...item} />
          </section>
        ))}
      </section>
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  .cartContent {
    border-right: 1px solid black;
    padding-block: 3em;
    @media (max-width: 768px) {
      padding-block: 1em;
      border-right: none;
    }
  }
  .column-cart {
    padding: 2em;
  }
`;
export default CartContent;
