import { imageHolder } from '../../assets';
import { reviewData } from '../../utils/constants';

const Review = () => {
  const reviews = reviewData.map(({ review, image, name, company }, index) => (
    <div
      key={index}
      className='p-[24px] flex flex-col gap-[23px] bg-[#f5f8fd] tablet:min-w-[340px] min-w-full'
      style={{ boxShadow: '4px 4px 0px 0px #01248C' }}>
      <div className='text-[rgba(1,36,140,0.80)] font-satoshi text-[16px] font-medium leading-[34.5px] tracking-[-0.32px]'>
        {review}
      </div>
      <div className='flex max-smallMobile:justify-between smallMobile:gap-[18px]'>
        <div className='w-[72px] aspect-square rounded-[72px]'>
          <img src={image || imageHolder} alt='' />
        </div>
        <div className='flex flex-col'>
          <div className='self-stretch text-[#01248c] font-satoshi  text-[15.281px] laptop:text-[20px] font-medium leading-[26.36px]  laptop:leading-[34.5px] laptop:tracking-[-0.4px] tablet:tracking-[-0.306px]'>
            {name}
          </div>
          <div className='self-stretch text-[rgba(1,36,140,0.50)] font-satoshi text-[14px]  tablet:text-[16px] leading-[34.5px] tablet:leading-[34.5px] tracking-[-0.32px]'>
            {company}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='py-[42px]  gap-[38px] laptop:gap-[79px] flex flex-col pb-[109px] bg-white'>
      <div className='px-[32px] tablet:px-[63px] underline underline-offset-[12px] font-satoshi text-[24px] tablet:text-[28px] laptop:text-[38px] font-medium laptop:leading-[60px] tablet:leading-[38px] leading-[36.5px] laptop:tracking-[-0.76px] tablet:tracking-[-0.56px] text-[#01248c]'>
        What people say about us
      </div>
      <div className='flex gap-[28px] overflow-x-auto pl-[32px]'>{reviews}</div>
    </div>
  );
};

export default Review;
