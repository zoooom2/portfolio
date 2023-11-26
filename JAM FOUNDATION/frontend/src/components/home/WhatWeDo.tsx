import { WhyJamLinks, whatWeDoLinks } from '../../utils/constants';

const WhatWeDo = () => {
  const firstLinks = whatWeDoLinks.map((link) => (
    <div
      key={link.id}
      className='p-[10px] gap-[10px] flex flex-col items-start justify-center tablet:bg-[rgba(255,255,255,0.10)] laptop:bg-inherit'>
      <div className='flex items-baseline aspect-[38/41] w-[38px]'>
        <img src={link.logo} alt='' className='w-full h-full' />
      </div>
      <div className='font-satoshi text-white laptop:text-[20px] tablet:text-[18px] text-[16px] font-bold leading-[19.5px]'>
        {link.title}
      </div>
      <div className='text-white font-satoshi laptop:text-[18px] text-[14px] max-laptop:leading-[24px] '>
        {link.body}
      </div>
    </div>
  ));

  const secondLinks = WhyJamLinks.map((link, index) => (
    <div
      key={index}
      className={`${
        index === 0 || index % 3 === 0
          ? 'bg-[rgba(252,252,253,0.1)]'
          : 'bg-[#01248c] '
      } flex flex-col gap-[10px] tablet:px-[15px] py-[20px] max-tablet:bg-inherit laptop:bg-inherit`}>
      <div className='max-tablet:text-[#01248c] text-white font-satoshi laptop:text-[32px] leading-[44.5px] tablet:text-[22px] text-[20px] max-tablet:font-bold'>
        {link.title}
      </div>
      <div className='max-tablet:text-[#01248c] text-white font-satoshi leading-[26px] text-justify laptop:text-[18px] text-[14px]'>
        {link.body}
      </div>
    </div>
  ));
  return (
    <div
      className='flex flex-col bg-[#01248c]'
      style={
        {
          // background: 'radial-gradient(circle at 50% 150%, #01248c 99%,#fff 90%',
        }
      }>
      <div className='flex flex-col items-center gap-[46px] pt-[50px] pb-[32px]'>
        <div className='font-satoshi text-[24px] tablet:text-[28px] laptop:text-[32px] text-white font-medium leading-[19.5px] tablet:leading-[42px] laptop:leading-[19.5px] underline underline-offset-[12px] tablet:tracking-[-0.56px]'>
          what we do
        </div>
        <div className='grid tablet:grid-cols-2 desktop:grid-cols-4 gap-[23px] laptop:px-[80px] tablet:px-[60px] px-[26px]'>
          {firstLinks}
        </div>
      </div>
      <div className='flex flex-col items-start px-[65px] max-tablet:px-[28px] pt-[42px] tablet:gap-[42px] tablet:bg-[#0077be] pb-[46px] laptop:bg-[#01248c] max-tablet:bg-white'>
        <div className='max-tablet:text-[#01248c] text-white font-satoshi laptop:text-[38px] underline underline-offset-[12px] tablet:text-[28px] text-[24px] max-laptop:font-medium max-laptop:leading-[45.5px] max-laptop:tracking-[-0.56px] '>
          why choose JAM foundation
        </div>
        <div className='grid desktop:grid-cols-4 tablet:grid-cols-2 laptop:gap-[35px] tablet:gap-x-[21px] tablet:gap-y-[24px]'>
          {secondLinks}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
