import { CalendarOutline, UserOutline } from '../../assets';
import { mockBlogpostsDB } from '../../utils/constants';

const Blog = () => {
  const blog = mockBlogpostsDB.map((post, index) => (
    <div key={index} className='flex flex-col relative min-w-fit'>
      <div className='w-full'>
        <img src={post.image} alt='' className='w-full' />
      </div>
      <div className='relative h-[204px]'>
        <div className='flex absolute right-[-10px] h-full bottom-8 w-full'>
          <div className='bg-[#01248c] w-[8px] h-[51px]'></div>
          <div
            className='py-[20px] px-[10px] flex flex-col gap-[10px] items-start justify-between bg-[rgba(0,119,190,0.2)]'
            style={{
              WebkitBackdropFilter: 'blur(10px)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className='max-smallMobile:text-[14px] font-satoshi laptop:text-[20px] text-[16px] font-bold leading-[20.33px] tablet:leading-[21.569px] laptop:leading-[28px] text-[#01248c] self-stretch '>
              {post.title}
            </div>
            <div className='text-[rgba(0,0,0,0.5)] font-satoshi laptop:text-[16px] max-smallMobile:text-[10px] text-[14px] tablet:leading-[18.487px] laptop:leading-[24px] self-stretch flex'>
              {post.body}
            </div>
            <div className='flex justify-between items-center w-full'>
              <div className='flex  gap-[8px] tablet:gap-[12px]'>
                <div className='flex gap-[6px] tablet:gap-[8px] items-end'>
                  <div className='tablet:w-[24px] tablet:h-[24px] w-[17px] h-[17px]'>
                    <img
                      src={CalendarOutline}
                      alt=''
                      className='w-full h-full'
                    />
                  </div>
                  <div className='font-satoshi text-[8.713px] laptop:text-[14px] laptop:leading-[24px] text-[rgba(1,36,140,0.50)] tablet:text-[10.784px] tablet:leading-[18.487px] leading-[17.487px]'>
                    {post.date}
                  </div>
                </div>
                <div className='flex gap-[6px] tablet:gap-[8px] items-end'>
                  <div className='tablet:w-[24px] tablet:h-[24px] w-[17px] h-[17px]'>
                    <img src={UserOutline} alt=' h-full w-full' />
                  </div>
                  <div className='font-satoshi text-[8.713px] laptop:text-[14px] laptop:leading-[24px] text-[rgba(1,36,140,0.50)] tablet:text-[10.784px] tablet:leading-[18.487px] leading-[17.487px]'>
                    {post.author}
                  </div>
                </div>
              </div>
              <button className='font-inter text-[#01248c] laptop:text-[14px] text-[10.165px] font-semibold leading-[20px] bg-transparent'>
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  return <>{blog}</>;
};

export default Blog;
