import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { priceFormat } from '../../../../utils/constants';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const { orders } = useAppSelector((state) => state.admin);
  const order = orders.find((order) => order._id === id);

  const orderBody = order?.orderItems.map((product) => {
    return (
      <Link
        to={`/admin/product/detail/${product.productID}`}
        key={product.productID}
        className='border border-solid border-[#b6b6b6] px-[15px] w-[280px] h-[300px] relative'>
        <div className='h-[230px] flex justify-center items-center p-3'>
          <img
            src={product.image}
            alt='productImage'
            className='object-contain w-full h-full'
          />
        </div>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col'>
            <div className='text-black font-baz1 text-[18px] capitalize'>
              {product.productName}
            </div>
            <div className='text-[#2A2A2A] text-[14px] font-baz1'>sizes</div>
          </div>
          <div className='text-[#2A2A2A] text-[18px] font-baz1'>
            {priceFormat(product.price)}
          </div>
        </div>
      </Link>
    );
  });

  return (
    <section className='flex flex-col pb-14 w-full'>
      <Hero
        title='Orders'
        subtitle='Order Detail'
        description="Stay up to date with your store's current status"
      />
      <div className='gap-10 flex flex-col pl-12 pr-40 pt-4 w-full'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='font-baz1 text-[20px] font-medium text-black'>
              {order?._id}
            </div>
            <div className='text-[#2A2A2A] text-[14px] font-baz1'>
              {order?.createdAt}
            </div>
          </div>
          <span className='text-[12px] px-[20px] py-[10px] border border-solid'>
            {order?.orderStatus}
          </span>
        </div>
        <div className='capitalize gap-1 flex flex-col text-[18px] font-baz1 font-light'>
          <div>{`${order?.user.lastname} ${order?.user.firstname}`}</div>
          <div>{order?.shippingInfo.phoneNumber}</div>
          <div>{order?.user.email}</div>
          <div>{`${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.country}`}</div>
        </div>
        <div className='flex flex-col'>
          <div className='border-b border-[#b6b6b6] flex justify-between items-center pb-2'>
            <div>{order?.total_items} pieces</div>
            <div>
              <MdKeyboardArrowDown />
            </div>
          </div>
          <div className='flex justify-start flex-shrink-0 flex-wrap  gap-[40px] py-[40px]'>
            {orderBody}
          </div>
        </div>
        <div className='text-[18px] grid grid-cols-2 font-light text-black'>
          <div>Subtotal</div>
          <div className='tracking-wider'>
            {order && priceFormat(order?.subtotal)}
          </div>
          <div>Delivery</div>
          <div className='tracking-wider'>
            {order && priceFormat(order?.shippingInfo.shippingFee)}
          </div>

          <div className='pt-6'>Total</div>
          <div className='pt-6 tracking-wider'>
            {order && priceFormat(order?.total_amount)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrderDetail;
