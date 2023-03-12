import styled from 'styled-components';
import { BsPaypal } from 'react-icons/bs';
import { GrStripe } from 'react-icons/gr';
import { useCartContext } from '../context/cart_context';
import axios from 'axios';

const PaymentGateway = () => {
  const { shipping_details, cart, total_amount } = useCartContext();

  const handlePaypal = async () => {};

  const handleStripe = () => {};

  const handlePayStack = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2705/api/v1/order/paystack/checkout-session',
        data: {
          shippingInfo: { ...shipping_details },
          orderItems: cart,
          totalPrice: total_amount,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Wrapper className="page-100 section section-center">
      <div className="gateway-container">
        <h5>Select Payment Option</h5>
        {/* <Select options={options} className="option" /> */}
        <button className="paypalBtn btn" onClick={handlePaypal}>
          <img src="/paypal-3.svg" alt="Paypal" />
        </button>
        <button className="stripeBtn btn" onClick={handleStripe}>
          <GrStripe /> Stripe
        </button>
        <button className="paystackBtn btn" onClick={handlePayStack}>
          <img src="/paystack-2.svg" alt="logo" />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .gateway-container {
    padding: 30px;
    box-shadow: var(--light-shadow);
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.2);
    width: 60%;
    display: grid;
    border: 2px solid rgba(0, 0, 0, 0.1);
    place-items: center;
    @media (max-width: 720px) {
      width: 95%;
    }
  }
  .option {
    width: 50%;
  }

  .paypalBtn {
    background: rgba(0, 0, 0, 0.2);
    margin-block: 1em;
  }
  .paypalBtn:hover {
    color: white;
  }

  .btn {
    width: 50% !important;
    text-transform: lowercase !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .stripeBtn {
    color: white;
    background: black;
  }
  img {
    height: 1em;
  }

  .paystackBtn {
    background: rgba(0, 0, 0, 0.1);
    margin-block: 1em;
  }
  h5 {
    margin-bottom: 2em;
    color: var(--clr-primary-5);
  }
`;

export default PaymentGateway;
