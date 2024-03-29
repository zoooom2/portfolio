import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { useEffect } from 'react';
import { fetchSingleArticle } from '../features/globalSlice';

const SingleArticlePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { singleArticle, articles } = useAppSelector((state) => state.global);

  const { title, titleUl, overview, image, content } = singleArticle;

  useEffect(() => {
    dispatch(fetchSingleArticle(id as string));
  }, [dispatch, id]);

  const paragraphs = content.map(({ topic, description }, index) => (
    <div key={index} className='flex flex-col gap-[16px]'>
      <div className='font-satoshi text-[16px] tablet:text-[18px] laptop:text-[20px] font-medium leading-[28px] tablet:leading-[44.5px] text-[#01248c]'>
        {topic}
      </div>
      <div className='text-[rgba(0,0,0,0.5)] font-satoshi  text-[14px] tablet:text-[16px] laptop:text-[18px] leading-[32px] text-justify'>
        {description}
      </div>
    </div>
  ));

  const moreArticles = articles.map(
    ({ image, title, overview, dateCreated, _id: id }, index) => (
      <Link
        to={`articles/${id}`}
        key={index}
        className='grid grid-cols-1 gap-[16px]'>
        <div className=' w-full'>
          <img src={image as string} alt='' className='w-full' />
        </div>
        <div className='flex flex-col'>
          <div className='font-satoshi tablet:text-[18px] laptop:text-[20px] font-bold leading-[28px] text-[#01248c]'>
            {title}
          </div>
          <div className='text-[rgba(25,54,132,0.50)] font-poppins text-[14px] tablet:text-[16px] leading-[29.161px]'>
            {new Date(Date.parse(dateCreated)).toLocaleDateString('en-GB')}
          </div>
        </div>
        <div className='text-[rgba(0,0,0,0.5)] font-satoshi text-[14px] tablet:text-[16px] laptop:text-[18px] leading-[24px] text-justify'>
          {overview}
        </div>
      </Link>
    )
  );

  return (
    <div className='mt-[80px] py-[42px] px-[24px] tablet:px-[63px] bg-[#fcfcfd] flex flex-col gap-[24px] tablet:gap-[32px]'>
      <div className='font-satoshi text-[#01248c] text-[20px] tablet:text-[30px] laptop:text-[38px] leading-[44.5px]'>
        <span>{title}</span>
        <span className={`${!titleUl && 'hidden'}`}>: </span>
        <span
          className={`underline underline-offset-[8px] ${
            !titleUl && 'hidden'
          }`}>
          {titleUl}
        </span>
      </div>
      <div className='flex gap-[35px] max-laptop:flex-col'>
        <div className='flex flex-col gap-[16px] w-2/3 max-laptop:w-full'>
          <div className='flex flex-col gap-[42px]'>
            <div className='w-full'>
              <img
                src={image as string}
                alt=''
                className='object-contain w-full'
              />
            </div>
            <div className='text-[rgba(0,0,0,0.5)] font-satoshi text-[14px] tablet:text-[16px] laptop:text-[18px] leading-[32px] text-justify'>
              {overview}
            </div>
          </div>

          {paragraphs}
        </div>
        <div className='laptop:w-1/3 flex flex-col gap-[42px]'>
          <div className='flex items-center'>
            <div className='h-[37px] w-[4px] bg-[#01248c]'></div>
            <div className='text-[#01248c] font-satoshi text-[16px] tablet:text-[28px] laptop:text-[32px] font-medium leading-[44.4px]'>
              More from JAM foundation
            </div>
          </div>
          {moreArticles}
        </div>
      </div>
    </div>
  );
};

export default SingleArticlePage;
