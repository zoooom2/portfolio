import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { priceFormat, sizeAbbr } from '../../../../utils/constants';
import {
  changeSideMenuValue,
  fetchSingleOrder,
  updateOrderStatus,
} from '../../adminSlice';
import { useEffect } from 'react';
import { Error } from '../../../../global_components';
import { SpinnerCircular } from 'spinners-react';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const { singleOrder, fetch_single_order_error, loading } = useAppSelector(
    (state) => state.admin
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchSingleOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(changeSideMenuValue('order'));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (id)
      dispatch(
        updateOrderStatus({
          id,
          orderStatus:
            singleOrder.orderStatus === 'completed' ? 'pending' : 'completed',
        })
      );
  };

  const orderBody = singleOrder?.orderItems.map((product, index) => {
    return (
      <Link
        to={`/admin/product/detail/${product.productID.id}`}
        key={index}
        className='tablet:border tablet:border-[#b6b6b6] px-[15px] tablet:aspect-[306/328] tablet:w-[280px] tablet:h-[300px] items-center gap-[15px] w-full relative flex tablet:flex-col'>
        <div className='tablet:h-[230px] flex justify-center items-center tablet:p-3 aspect-[51/48] max-tablet:w-[60px]'>
          <img
            src={product.image}
            alt='productImage'
            className='object-contain w-full h-full'
          />
        </div>
        <div className='flex justify-between items-start max-tablet:border-b border-[#b6b6b6] w-full max-tablet:py-[24px]'>
          <div className='flex flex-col'>
            <div className='text-black font-baz1 text-[14px] tablet:text-[18px] capitalize'>
              {product.productName}
            </div>
            <div className='text-[#2A2A2A] text-[14px] font-baz1 flex gap-1'>
              {product.sizes.map(({ size, quantity, _id }) => (
                <div key={_id} className='gap-[2px] flex'>
                  <span>{quantity}</span>
                  <span>
                    {sizeAbbr[size as keyof typeof sizeAbbr]
                      ? sizeAbbr[size as keyof typeof sizeAbbr]
                      : size}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='text-[#2A2A2A] text-[14px] tablet:text-[18px] font-baz1'>
            {priceFormat(product.price)}
          </div>
        </div>
      </Link>
    );
  });

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center h-[80vh]'>
        <SpinnerCircular secondaryColor={'#000'} color='white' size={200} />
      </div>
    );
  }

  if (fetch_single_order_error) {
    return <Error />;
  }

  return (
    <section className='flex flex-col pb-14 w-full bg-baz-white'>
      <Hero
        title='Orders'
        subtitle='Order Detail'
        description="Stay up to date with your store's current status"
      />
      <div className='gap-10 flex flex-col px-[16px] tablet:pl-12 pt-4 w-11/12'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='font-baz1 text-[20px] tablet:text-[28px] font-medium text-black uppercase'>
              {singleOrder?.paymentInfo.reference}
            </div>
            <div className='text-[#2A2A2A] text-[12px] tablet:text-[14px] font-baz1'>
              {singleOrder
                ? new Date(singleOrder.createdAt).toLocaleDateString('en-GB')
                : ''}
            </div>
          </div>
          <div className='flex items-center max-tablet:hidden'>
            <button
              className='py-[20px] h-fit font-baz2 text-[16px] font-bold bg-baz-black text-white tablet:px-[44px] laptop:px-[88px] btn'
              onClick={handleClick}>
              {singleOrder.orderStatus === 'pending'
                ? 'Click to complete order'
                : 'Click to reverse status'}
            </button>
          </div>
        </div>
        <div className='capitalize gap-1 flex flex-col font-baz1 text-black tablet:text-[18px] text-[15px]'>
          <div className='flex gap-2 items-center'>
            <span>Status:</span>
            <span
              className={
                (singleOrder?.orderStatus !== 'completed'
                  ? ` text-[#ed0000] `
                  : ' text-[#05e201]') + ' font-baz1 capitalize'
              }>
              {singleOrder?.orderStatus}
            </span>
          </div>
          <div className=' font-medium'>{`${singleOrder?.shippingInfo.lastName} ${singleOrder?.shippingInfo.firstName}`}</div>
          <div>{singleOrder?.shippingInfo.phoneNumber}</div>
          <div>{singleOrder?.shippingInfo.email}</div>
          <div>{`${singleOrder?.shippingInfo.address}, ${singleOrder?.shippingInfo.city}, ${singleOrder?.shippingInfo.state}`}</div>
        </div>
        <div className='flex flex-col'>
          <div className='border-b border-[#b6b6b6] flex justify-between items-center pb-2'>
            <div className='font-baz1 text-[20px] tablet:text-[24px] font-medium'>
              {singleOrder?.total_items} pieces
            </div>
            <div className='text-[20px] tablet:tablet-[24px]'>
              <MdKeyboardArrowDown />
            </div>
          </div>
          <div className='flex justify-start flex-shrink-0 flex-wrap tablet:gap-[40px] tablet:py-[40px]'>
            {orderBody}
          </div>
        </div>
        <div className='text-[14px] tablet:text-[18px] grid grid-cols-2 font-light text-black font-baz1'>
          <div>Subtotal</div>
          <div className='tracking-wider'>
            {singleOrder && priceFormat(singleOrder?.subtotal)}
          </div>
          <div>Delivery</div>
          <div className='tracking-wider'>
            {singleOrder && priceFormat(singleOrder?.shippingInfo.shippingFee)}
          </div>

          <div className='pt-6'>Total</div>
          <div className='pt-6 tracking-wider'>
            {singleOrder && priceFormat(singleOrder?.total_amount)}
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className='py-[20px] h-fit font-baz2 text-[12px] font-bold bg-baz-black text-white px-[16px] btn tablet:hidden'
            onClick={handleClick}>
            Click to complete Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminOrderDetail;
