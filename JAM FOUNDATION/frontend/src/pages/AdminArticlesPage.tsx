import { Link } from 'react-router-dom';
import Blog from '../components/home/Blog';

const AdminArticlesPage = () => {
  return (
    <div className='py-[42px] mt-[80px] flex flex-col gap-[52px] bg-[#fcfcfd] w-full'>
      <div className='text-[#01248c] font-satoshi  px-[16px] flex justify-between'>
        <div className='text-[38px] font-medium leading-[44.5px] underline underline-offset-[12px]'>
          Edit Articles
        </div>
        <Link
          to={'/admin/articles/create'}
          className='py-[8px] px-[14px] grid place-items-center text-[#01248c] text-center font-inter text-[14px] font-semibold leading-[20px] bg-[rgba(1,36,140,0.30)]'>
          New Article
        </Link>
      </div>
      <div className='laptop:px-[32px] grid tablet:grid-cols-2 desktop:grid-cols-3 gap-0 tablet:gap-6 justify-center max-smallMobile:px-5 max-desktop:w-[95%] desktop:w-full'>
        <Blog admin={true} />
      </div>
    </div>
  );
};

export default AdminArticlesPage;
