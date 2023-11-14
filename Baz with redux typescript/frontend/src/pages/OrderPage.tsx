import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  // clearCart,
  // clearShipping,
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../App/hooks';

const OrderPage = () => {
  const body = useAppSelector((state) => state.cart);
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get('reference');
  const dispatch = useDispatch();

  const getDetails = async () => {
    try {
      if (body.cart && body.shippingInfo) {
        const url = `https://baz-api.onrender.com/api/v1/order/paystack/createOrder`;
        await axios.post(
          url,
          { ...body, reference },
          {
            withCredentials: true,
          }
        );

        // dispatch(clearCart());
        // dispatch(clearShipping());
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        console.log(axiosError.response?.data);
      }
    }
  };

  useEffect(() => {
    document.title = 'Order | Baz Official Store';
    const res = localStorage.getItem('shipping');
    const req = localStorage.getItem('cart');
    console.log(req, res);
    dispatch(countCartTotal());
    dispatch(updateCartTotal());
    console.log(body);
    if (body.cart) {
      getDetails();
      // localStorage.removeItem('cart');
      // localStorage.removeItem('shipping');
    }
  }, []);

  return <h1>order successful</h1>;
};

export default OrderPage;
