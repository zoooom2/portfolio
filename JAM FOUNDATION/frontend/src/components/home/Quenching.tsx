import { Link } from 'react-router-dom';
import { QuenchingFullImg, QuenchingImage } from '../../assets';

const Quenching = () => {
  return (
    <div className='grid tablet:grid-cols-2 mt-[80px] tablet:pl-[63px] tablet:pr-[36px] gap-[40px] tablet:pb-[62px] pb-[32px] bg-[#fcfcfd]'>
      <div className='w-full tablet:hidden'>
        <img src={QuenchingFullImg} alt='' className='w-full' />
      </div>
      <div className='flex flex-col gap-[22px] tablet:pt-[102px] max-tablet:px-[32px]'>
        <div className='laptop:text-[59.2px] font-Bricolage text-[#01248c] font-medium laptop:leading-[74px] tablet:text-[32px] tablet:leading-[41.5px]'>
          Quenching thirst, improving sanitation and Hygiene
        </div>
        <div className='text-[rgba(1,36,140,0.50)] font-satoshi laptop:text-[18px] text-[14px] font-semibold leading-[28px]'>
          JAM Foundation is an NGO that specializes in the provision of clean
          water and the enlightenment of people about the importance of good
          sanitation and hygiene
        </div>
        <Link
          to={'/contact'}
          className='rounded-none px-[8px] py-[14px] w-fit font-inter text-[14px] font-semibold leading-[20px] bg-[rgba(1,36,140,0.2)] text-[#01248c]'>
          Partner with us
        </Link>
      </div>
      <div className='pt-[62px] max-tablet:hidden'>
        <div className='w-full max-tablet:hidden'>
          <img src={QuenchingImage} alt='' className='w-full' />
        </div>
      </div>
    </div>
  );
};

export default Quenching;
