import { imageHolder } from '../../assets';

const Review = () => {
  return (
    <div className='py-[42px] px-[63px] gap-[79px] flex flex-col pb-[109px]'>
      <div className='underline underline-offset-[12px] font-satoshi text-[38px] font-medium leading-[60px] tracking-[-0.76px] text-[#01248c]'>
        What people say about us
      </div>
      <div className='grid grid-cols-3 gap-[28px] '>
        <div
          className='p-[24px] flex flex-col gap-[23px] bg-[#F2F4F7]'
          style={{ boxShadow: '4px 4px 0px 0px #01248C' }}>
          <div className='text-[rgba(1,36,140,0.80)] font-satoshi text-[16px] font-medium leading-[34.5px] tracking-[-0.32px]'>
            Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet nisi ut
            elementum mattis non sed et. Convallis accumsan nibh enim at. Eros
            pellentesque id rutrum enim. Sed tortor dolor acLorem ipsum dolor
            sit amet consectetur. Adipiscing imperdiet nisi ut elementum mattis
            non sed et. Convallis accumsan nibh enim at. Eros pellentesque id
            rutrum enim. Sed tortor dolor ac.
          </div>
          <div className='flex gap-[18px]'>
            <div className='w-[72px] aspect-square rounded-[72px]'>
              <img src={imageHolder} alt='' />
            </div>
            <div className='flex flex-col'>
              <div className='self-stretch text-[#01248c] font-satoshi text-[20px] font-medium leading-[34.5px] tracking-[-0.4px]'>
                Dr Naomi .D. Francies
              </div>
              <div className='self-stretch text-[rgba(1,36,140,0.50)] font-satoshi text-[16px] leading-[34.5px] tracking-[-0.32px]'>
                Treasure orphanage
              </div>
            </div>
          </div>
        </div>
        <div
          className='p-[24px] flex flex-col gap-[23px] bg-[#F2F4F7]'
          style={{ boxShadow: '4px 4px 0px 0px #01248C' }}>
          <div className='text-[rgba(1,36,140,0.80)] font-satoshi text-[16px] font-medium leading-[34.5px] tracking-[-0.32px]'>
            Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet nisi ut
            elementum mattis non sed et. Convallis accumsan nibh enim at. Eros
            pellentesque id rutrum enim. Sed tortor dolor acLorem ipsum dolor
            sit amet consectetur. Adipiscing imperdiet nisi ut elementum mattis
            non sed et. Convallis accumsan nibh enim at. Eros pellentesque id
            rutrum enim. Sed tortor dolor ac.
          </div>
          <div className='flex gap-[18px]'>
            <div className='w-[72px] aspect-square rounded-[72px]'>
              <img src={imageHolder} alt='' />
            </div>
            <div className='flex flex-col'>
              <div className='self-stretch text-[#01248c] font-satoshi text-[20px] font-medium leading-[34.5px] tracking-[-0.4px]'>
                Dr Naomi .D. Francies
              </div>
              <div className='self-stretch text-[rgba(1,36,140,0.50)] font-satoshi text-[16px] leading-[34.5px] tracking-[-0.32px]'>
                Treasure orphanage
              </div>
            </div>
          </div>
        </div>
        <div
          className='p-[24px] flex flex-col gap-[23px] bg-[#F2F4F7]'
          style={{ boxShadow: '4px 4px 0px 0px #01248C' }}>
          <div className='text-[rgba(1,36,140,0.80)] font-satoshi text-[16px] font-medium leading-[34.5px] tracking-[-0.32px]'>
            Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet nisi ut
            elementum mattis non sed et. Convallis accumsan nibh enim at. Eros
            pellentesque id rutrum enim. Sed tortor dolor acLorem ipsum dolor
            sit amet consectetur. Adipiscing imperdiet nisi ut elementum mattis
            non sed et. Convallis accumsan nibh enim at. Eros pellentesque id
            rutrum enim. Sed tortor dolor ac.
          </div>
          <div className='flex gap-[18px]'>
            <div className='w-[72px] aspect-square rounded-[72px]'>
              <img src={imageHolder} alt='' />
            </div>
            <div className='flex flex-col'>
              <div className='self-stretch text-[#01248c] font-satoshi text-[20px] font-medium leading-[34.5px] tracking-[-0.4px]'>
                Dr Naomi .D. Francies
              </div>
              <div className='self-stretch text-[rgba(1,36,140,0.50)] font-satoshi text-[16px] leading-[34.5px] tracking-[-0.32px]'>
                Treasure orphanage
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
