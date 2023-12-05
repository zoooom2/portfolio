import { useEffect } from 'react';

const DeliveryPage = () => {
  useEffect(() => {
    document.title = 'Delivery | Baz Official Store';
  }, []);

  return (
    <div>
      <div className='flex flex-col items-center py-[45px] justify-center border-b w-full border-black font-baz2 text-[20px] font-semibold tracking-[2px] tablet:text-[24px] tablet:tracking-[2.4px]'>
        Contact
      </div>
      <div className='flex flex-column max-tablet:divide-y tablet:grid tablet:grid-cols-3 tablet:divide-x divide-black border-b border-black justify-center '>
        <div className='py-[45px] w-full font-baz1 text-[10px] tablet:text-[16px] leading-[200.5%] tracking-[1px] tablet:tracking-[1.6px] flex flex-col items-center'>
          <div className='font-semibold'>Email</div>
          <a href='mailto:bazonlineshop@gmail.com'>Bazonlineshop@gmail.com</a>
        </div>
        <div className='py-[45px] w-full font-baz1 text-[10px] tablet:text-[16px] leading-[200.5%] tracking-[1px] tablet:tracking-[1.6px] flex flex-col items-center'>
          <div className='font-semibold'>Instagram</div>
          <a
            href='https://instagram.com/baz.ng?igshid=YmMyMTA2M2Y='
            target='_blank'
            rel='nonreferrer'>
            @baz.ng
          </a>
        </div>
        <div className='py-[45px] w-full font-baz1 text-[10px] tablet:text-[16px] leading-[200.5%] tracking-[1px] tablet:tracking-[1.6px] flex flex-col items-center'>
          <div className='font-semibold'>Twitter</div>
          <a
            href='https://twitter.com/baz_online?s=21&t=BPQsKKo2G-RqbP61p1YIg'
            target='_blank'
            rel='nonreferrer'>
            @baz_online
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
