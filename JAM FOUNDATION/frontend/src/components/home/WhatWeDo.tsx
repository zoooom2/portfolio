import { WhyJamLinks, whatWeDoLinks } from '../../utils/constants';

const WhatWeDo = () => {
  const firstLinks = whatWeDoLinks.map((link) => (
    <div
      key={link.id}
      className='p-[10px] gap-[10px] flex flex-col items-start justify-center'>
      <div className='flex items-baseline'>
        <img src={link.logo} alt='' className='' />
      </div>
      <div className='font-satoshi text-white text-[20px] font-bold leading-[19.5px]'>
        {link.title}
      </div>
      <div className='text-white font-satoshi text-[18px]'>{link.body}</div>
    </div>
  ));

  const secondLinks = WhyJamLinks.map((link, index) => (
    <div key={index} className='flex flex-col gap-[10px] p-[10px]'>
      <div className='text-white font-satoshi text-[38px] leading-[44.5px]'>
        {link.title}
      </div>
      <div className='text-white font-satoshi leading-[26px]'>{link.body}</div>
    </div>
  ));
  return (
    <div
      className='flex flex-col pb-[45px]'
      style={{
        background: 'radial-gradient(circle at 50% 150%, #01248c 99%,#fff 90%',
      }}>
      <div className='flex flex-col items-center gap-[46px] pt-[50px] pb-[32px]'>
        <div className='font-satoshi text-[32px] text-white font-medium leading-[19.5px] underline underline-offset-[12px]'>
          what we do
        </div>
        <div className='grid grid-cols-4 gap-[23px] px-[80px]'>
          {firstLinks}
        </div>
      </div>
      <div className='flex flex-col items-start px-[65px] pt-[42px] gap-[42px]'>
        <div className='text-white font-satoshi text-[38px] underline underline-offset-[12px]'>
          why choose JAM foundation
        </div>
        <div className='grid grid-cols-4 gap-[35px]'>{secondLinks}</div>
      </div>
    </div>
  );
};

export default WhatWeDo;
