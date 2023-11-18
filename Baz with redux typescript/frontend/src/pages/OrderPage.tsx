import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  clearCart,
  clearShipping,
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import { createOrder } from '../features/orderFeature/orderSlice';

import { useAppDispatch, useAppSelector } from '../App/hooks';
import useLocalStorage from '../utils/customHooks/localStorage';
import { setClicked } from '../features/userFeature/userSlice';
import { OrderGreenSVG } from '../assets';
import { Link } from 'react-router-dom';

const OrderPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_localStorageShipping, setLocalStorageShipping] = useLocalStorage(
    'shipping',
    []
  );

  const body = useAppSelector((state) => state.cart);
  const { order_created } = useAppSelector((state) => state.order);
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get('reference');
  const dispatch = useAppDispatch();

  const placeOrder = async () => {
    try {
      if (body.cart && body.shippingInfo && reference) {
        await dispatch(createOrder({ body, reference }));
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
    setLocalStorageShipping(body.shippingInfo);
  }, [body.shippingInfo]);

  useEffect(() => {
    dispatch(setClicked(true));
    document.title = 'Order | Baz Official Store';
    dispatch(countCartTotal());
    dispatch(updateCartTotal());
    placeOrder();
  }, []);

  return (
    <div className='flex flex-col'>
      <div>
        <div className='flex flex-col items-center py-[45px] justify-center border-b w-full border-black font-baz2 text-[20px] font-semibold tracking-[2px] tablet:text-[24px] tablet:tracking-[2.4px]'>
          Order Status
        </div>
      </div>
      <div className='p-[32px] tablet:py-[67px] w-full flex justify-center items-center'>
        <div className='flex gap-[48px] tablet:gap-[60px] flex-col items-center'>
          <div className='flex flex-col border-[2px] border-black items-center w-full tablet:w-3/5 laptop:w-8/12 aspect-[546/495]'>
            <div className='font-baz2 flex flex-col text-white bg-baz-black w-full items-center justify-center py-[24px]'>
              <div className='text-[12px] tracking-[1.2px] tablet:text-[24px] tracking:[2.4px] capitalize'>
                order
              </div>
              <div
                className={`${
                  order_created ? 'text-[#05E201]' : 'text-[#ed0000]'
                }  text-[16px] font-semibold tracking-[1.6px] tablet:text-[32px]  tablet:tracking-[3.2px] uppercase text-center`}>
                {order_created ? 'Confirmed' : 'unsuccessful'}
              </div>
            </div>
            {order_created ? (
              <div className='flex flex-col py-[50px] gap-[48px] items-center'>
                <div className='w-1/3 flex'>
                  <img
                    src={OrderGreenSVG}
                    alt='order successful'
                    className='w-full object-contain'
                  />
                </div>
                <div className='flex flex-col font-baz2 tracking-[1.2px] tablet:tracking-[1.6px] text-[12px] tablet:text-[16px] items-center'>
                  <div className='font-semibold capitalize text-center'>
                    estimated delivery
                  </div>
                  <div className=''>3-7 working days</div>
                </div>
                <div className='flex flex-col font-baz2 tracking-[1.2px] tablet:tracking-[1.6px] text-[12px] tablet:text-[16px] items-center text-center'>
                  check your mail to view order details
                </div>
              </div>
            ) : (
              <div className='flex flex-col pt-[50px] gap-[32px] items-center justify-center'>
                <div className='w-4/5 flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='173'
                    height='135'
                    viewBox='0 0 173 135'
                    fill='none'>
                    <path
                      d='M5 5L168 130'
                      stroke='#ED0000'
                      stroke-width='9'
                      stroke-linecap='round'
                    />
                    <path
                      d='M5 130L168 5'
                      stroke='#ED0000'
                      stroke-width='9'
                      stroke-linecap='round'
                    />
                  </svg>
                </div>
                <div className='underline flex flex-col font-baz2 tracking-[1.2px] tablet:tracking-[1.6px] text-[12px] tablet:text-[16px] items-center text-center'>
                  <Link to={'/shop'}>Return to shop</Link>
                </div>
              </div>
            )}
          </div>
          <div className='text-center font-baz2 text-[15px] tablet:text-[36px] tracking-[1.5px] tablet:tracking-[3.6px] uppercase'>
            IF YOU WANT To
            <span className='laptop:hidden'>
              <br />
            </span>{' '}
            TAKE OVER THE WORLD,
            <br /> FIRST THING YOU HAVE TO BUY IS BAZ.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
