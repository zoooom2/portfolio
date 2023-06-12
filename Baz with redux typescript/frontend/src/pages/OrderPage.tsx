import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  clearCart,
  clearShipping,
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import { useDispatch } from 'react-redux';

const OrderPage = () => {
  const body = useSelector((state) => state.cart);
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get('reference');
  const dispatch = useDispatch();

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
        dispatch(clearCart());
        dispatch(clearShipping());
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    dispatch(countCartTotal());
    dispatch(updateCartTotal());
    if (body.subtotal && body.total_amount) {
      getDetails();
      localStorage.removeItem('cart');
      localStorage.removeItem('shipping');
    }
  }, [body]);

  return <h1>order successful</h1>;
};

export default OrderPage;
