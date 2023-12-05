import { useEffect } from 'react';

const DeliveryPage = () => {
  useEffect(() => {
    document.title = 'Delivery | Baz Official Store';
  }, []);
  return (
    <div>
      <div className='flex flex-col items-center py-[45px] justify-center border-b w-full border-black font-baz2 text-[20px] font-semibold tracking-[2px] tablet:text-[24px] tablet:tracking-[2.4px]'>
        Delivery
      </div>
      <div className='grid grid-cols-2 divide-x divide-black border-b border-black justify-center '>
        <div className='py-[45px] w-full font-baz1 text-[10px] tablet:text-[16px] leading-[200.5%] tracking-[1px] tablet:tracking-[1.6px] flex flex-col items-center'>
          <div className='font-semibold '>Interstate delivery</div>
          <div>3-7 Business days</div>
        </div>
        <div className='py-[45px] w-full font-baz1 text-[10px] tablet:text-[16px] leading-[200.5%] tracking-[1px] tablet:tracking-[1.6px] flex flex-col items-center'>
          <div className='font-semibold'>International delivery</div>
          <div>10-14 Business days</div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
