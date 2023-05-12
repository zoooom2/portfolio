import { useCartContext } from '../context/cart_context';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OrderPage = () => {
  const body = useCartContext();
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get('reference');

  const getDetails = async () => {
    try {
      if (body.cart && body.shippingInfo) {
        const url = `/api/v1/order/paystack/createOrder`;
        await axios.post(
          url,
          { ...body, reference },
          {
            withCredentials: true,
          }
        );
        body.clearCart();
        body.clearShipping();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return <h1>order successful</h1>;
};

export default OrderPage;
