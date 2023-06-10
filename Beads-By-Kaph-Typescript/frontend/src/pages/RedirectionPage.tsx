import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCartContext } from '../context/contextHooks';

const RedirectPage = () => {
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
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        console.log(axiosError.response?.data);
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return <>abcg</>;
};

export default RedirectPage;
