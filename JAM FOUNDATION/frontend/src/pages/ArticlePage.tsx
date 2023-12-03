import Blog from '../components/home/Blog';

const ArticlePage = () => {
  return (
    <div className='py-[42px] mt-[80px] flex flex-col gap-[52px] bg-[#fcfcfd] w-full'>
      <div className='text-[#01248c] font-satoshi text-[38px] font-medium leading-[44.5px] underline underline-offset-[12px] px-[16px] '>
        Articles
      </div>
      <div className='laptop:px-[32px] grid tablet:grid-cols-2 desktop:grid-cols-3 gap-0 tablet:gap-6 justify-center max-smallMobile:px-5 max-desktop:w-[95%] desktop:w-full'>
        <Blog admin={false} />
      </div>
    </div>
  );
};

export default ArticlePage;
