import Blog from './Blog';

const Latest = () => {
  return (
    <div className='tablet:pl-[63px] tablet:pr-[70px] tablet:pt-[42px] flex flex-col gap-[45px] bg-[#fcfcfd] pb-[18px]'>
      <div className='font-satoshi text-[24px] tablet:text-[38px] font-medium leading-[60px] tracking-[-0.76px]  text-[#01248c] underline underline-offset-[12px] w-fit px-3'>
        Latest from JAM foundation
      </div>
      <Blog />

      <button className='max-tablet:mr-3 rounded-none px-[14px] py-[8px] flex items-center justify-center w-fit self-end mt-[-32px] text-[#01248c] font-inter text-[14px] font-semibold leading-[20px] bg-[rgba(0,119,190,0.2)]'>
        See All Articles
      </button>
    </div>
  );
};

export default Latest;
