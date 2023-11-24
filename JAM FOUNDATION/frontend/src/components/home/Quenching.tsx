import { QuenchingImage } from '../../assets';

const Quenching = () => {
  return (
    <div className='grid grid-cols-2 mt-[80px] pl-[63px] pr-[36px] gap-[40px] pb-[62px] bg-[#fcfcfd]'>
      <div className='flex flex-col gap-[22px] pt-[102px]'>
        <div className='text-[59.2px] font-Bricolage text-[#01248c] font-medium leading-[74px]'>
          Quenching thirst, improving sanitation and Hygiene
        </div>
        <div className='text-[rgba(1,36,140,0.50)] font-satoshi text-[18px] font-semibold leading-[28px]'>
          JAM Foundation is an NGO that specializes in the provision of clean
          water and the enlightenment of people about the importance of good
          sanitation and hygiene
        </div>
        <button className='rounded-none px-[8px] py-[14px] w-fit font-inter text-[14px] font-semibold leading-[20px] bg-[rgba(1,36,140,0.20)] text-[#01248c]'>
          Partner with us
        </button>
      </div>
      <div className='pt-[62px]'>
        <div>
          <img src={QuenchingImage} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Quenching;
