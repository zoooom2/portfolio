import Blog from '../components/home/Blog';
import { useEffect } from 'react';
import { fetchArticles } from '../features/globalSlice';
import { useAppDispatch } from '../App/hooks';

const ArticlePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className='py-[42px] mt-[80px] px-[16px] flex flex-col gap-[52px] bg-[#fcfcfd] w-full'>
      <div className='text-[#01248c] font-satoshi text-[38px] font-medium leading-[44.5px] underline underline-offset-[12px]'>
        Articles
      </div>
      <div className='grid tablet:grid-cols-2 desktop:grid-cols-3 gap-0 tablet:gap-8 tablet:px-8 max-smallMobile:px-5 max-desktop:w-[95%] desktop:w-full'>
        <Blog />
      </div>
    </div>
  );
};

export default ArticlePage;
