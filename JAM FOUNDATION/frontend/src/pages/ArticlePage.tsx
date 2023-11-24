import Blog from '../components/home/Blog';

const ArticlePage = () => {
  return (
    <div className='py-[42px] mt-[80px] px-[66px] flex flex-col gap-[52px] bg-[#fcfcfd]'>
      <div className='text-[#01248c] font-satoshi text-[38px] font-medium leading-[44.5px] underline underline-offset-[12px]'>
        Articles
      </div>
      <Blog />
    </div>
  );
};

export default ArticlePage;
