import { CalendarOutline, UserOutline } from '../../assets';
import { mockBlogpostsDB } from '../../utils/constants';

const Blog = () => {
  const blog = mockBlogpostsDB.map((post, index) => (
    <div key={index} className='flex flex-col relative'>
      <div>
        <img src={post.image} alt='' />
      </div>
      <div className='relative h-[204px]'>
        <div className='flex absolute right-[-10px] h-full bottom-8 w-full'>
          <div className='bg-[#01248c] w-[8px] h-[51px]'></div>
          <div
            className='py-[20px] px-[10px] flex flex-col gap-[10px] items-start justify-between bg-[rgba(0,119,190,0.2)]'
            style={{ backdropFilter: 'blur(10px)' }}>
            <div className='font-satoshi text-[20px] font-bold  leading-[28px] text-[#01248c] self-stretch'>
              {post.title}
            </div>
            <div className='text-[rgba(0,0,0,0.5)] font-satoshi text-[16px] leading-[24px] self-stretch flex'>
              {post.body}
            </div>
            <div className='flex justify-between items-center w-full'>
              <div className='flex gap-[12px]'>
                <div className='flex gap-[9px] items-end'>
                  <div className='w-[24px] h-[24px]'>
                    <img
                      src={CalendarOutline}
                      alt=''
                      className='w-full h-full'
                    />
                  </div>
                  <div className='font-satoshi text-[14px] leading-[24px] text-[rgba(1,36,140,0.50)]'>
                    {post.date}
                  </div>
                </div>
                <div className='flex gap-[8px] items-end'>
                  <div>
                    <img src={UserOutline} alt='' />
                  </div>
                  <div className='font-satoshi text-[14px] leading-[24px] text-[rgba(1,36,140,0.50)]'>
                    {post.author}
                  </div>
                </div>
              </div>
              <button className='font-inter text-[#01248c] text-[14px] font-semibold leading-[20px] bg-transparent'>
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  return <div className='grid grid-cols-3 gap-[28px]'>{blog}</div>;
};

export default Blog;
