import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  clearCart,
  clearShipping,
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../App/hooks';
import useLocalStorage from '../utils/customHooks/localStorage';

const OrderPage = () => {
  const [_localStorageShipping, setLocalStorageShipping] = useLocalStorage(
    'shipping',
    []
  );

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

        dispatch(clearCart());
        dispatch(clearShipping());
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        console.log(axiosError.response?.data);
      }
    }
  };

  useEffect(() => {
    setLocalStorageShipping(shippingInfo);
  }, [shippingInfo]);

  useEffect(() => {
    document.title = 'Order | Baz Official Store';
    dispatch(countCartTotal());
    dispatch(updateCartTotal());
    console.log(body);
    if (body.cart) {
      getDetails();
    }
  }, []);

  return <h1>order successful</h1>;
};

export default OrderPage;
