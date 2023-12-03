import { useNavigate } from 'react-router-dom';
import { CalendarOutline, UserOutline } from '../../assets';
import { VscEdit } from 'react-icons/vsc';
// import { mockBlogpostsDB } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { FaTrash } from 'react-icons/fa6';
import Modal from '../../global_components/Modal';
import { displayModal } from '../../features/globalSlice';

const Blog = ({ admin }: { admin: boolean }) => {
  const { articles } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    console.log('article deleted', id);
  };

  const blog = articles.map(
    ({ image, title, overview = '', dateCreated, author, _id: id }, index) => (
      <div
        onClick={() => !admin && navigate(`/articles/${id}`)}
        key={index}
        className={`flex flex-col relative min-w-fit ${
          !admin && 'cursor-pointer'
        }`}>
        {admin && (
          <Modal
            body='Are you sure you want to delete this article?'
            title='Delete Article'
            actionTitle='delete'
            action={() => handleDelete(id as string)}
          />
        )}
        <div className='aspect-[401/303] max-w-[441px] relative'>
          <img src={image as string} alt='' className='w-full h-full' />
          {admin && (
            <div className='absolute right-0 top-0 flex gap-2 p-2'>
              <button
                onClick={() => {
                  navigate(`/admin/articles/edit/${id}`);
                }}
                className='rounded-none aspect-square max-w-[40px] max-h-[40px] text-[#01248c] grid justify-center'>
                {/* <img src={Edit} alt='' /> */}
                <VscEdit />
              </button>
              <button
                className='aspect-square max-w-[40px] max-h-[40px] text-[#01248c] rounded-none grid justify-center'
                onClick={() => dispatch(displayModal(true))}>
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        <div className='relative h-[204px] max-w-[441px]'>
          <div className='flex absolute right-[-2px] tablet:right-[-5px] laptop:right-[-10px] h-full bottom-8 w-full'>
            <div className='bg-[#01248c] w-[8px] h-[51px]'></div>
            <div
              className='py-[20px] px-[10px] flex flex-col gap-[10px] items-start justify-between bg-[rgba(0,119,190,0.2)] hover-container w-full'
              style={{
                WebkitBackdropFilter: 'blur(10px)',
                backdropFilter: 'blur(10px)',
              }}>
              <div className='max-smallMobile:text-[14px] font-satoshi laptop:text-[20px] text-[16px] font-bold leading-[20.33px] tablet:leading-[21.569px] laptop:leading-[28px] text-[#01248c] self-stretch '>
                {title}
              </div>
              <div className='text-[rgba(0,0,0,0.5)] font-satoshi laptop:text-[16px] max-smallMobile:text-[10px] text-[14px] tablet:leading-[18.487px] laptop:leading-[24px] self-stretch flex'>
                {overview.length > 50 ? overview.substring(0, 100) : overview}
                ...
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
                      {new Date(Date.parse(dateCreated)).toLocaleDateString(
                        'en-GB'
                      )}
                    </div>
                  </div>
                  <div className='flex gap-[6px] tablet:gap-[8px] items-end'>
                    <div className='tablet:w-[24px] tablet:h-[24px] w-[17px] h-[17px]'>
                      <img src={UserOutline} alt='h-full w-full' />
                    </div>
                    <div className='font-satoshi text-[8.713px] laptop:text-[14px] laptop:leading-[24px] text-[rgba(1,36,140,0.50)] tablet:text-[10.784px] tablet:leading-[18.487px] leading-[17.487px]'>
                      {author}
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
    )
  );
  return <>{blog}</>;
};

export default Blog;
