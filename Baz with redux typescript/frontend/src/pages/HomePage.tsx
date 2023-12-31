import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Entry } from '../global_components';
import ImageSlider from '../global_components/ImageSlider';
import { featuredSlide1, featuredSlide2 } from '../utils/constants';
import { useAppSelector } from '../App/hooks';

const HomePage = () => {
  const { clicked } = useAppSelector((state) => state.user);

  if (clicked === true) {
    return (
      <Wrapper className='border border-baz-black'>
        <div className='tablet:w-1/2 h-full border-r border-baz-black w-full'>
          <ImageSlider slides={featuredSlide1} timer={1500} />
        </div>
        <div className='tablet:w-1/2 max-tablet:hidden'>
          <ImageSlider slides={featuredSlide2} timer={1000} />
        </div>
        <Link
          to='/shop'
          className='border border-[#f9f8f8] leading-[24px] text-[20px] discover-btn bg-[rgba(0,0,0,0.8)] text-baz-white absolute left-1/2 top-1/2 py-[16px] px-[24px] cursor-pointer font-semibold'>
          DISCOVER
        </Link>
      </Wrapper>
    );
  } else {
    return <Entry />;
  }
};

const Wrapper = styled.main`
  height: calc(100vh - (5em + 70px));
  margin: 1em;
  display: flex;
  flex: 1;
  position: relative;

  .discover-btn {
    transform: translate(-50%, -50%);
    font-family: Zilla Slab, serif;
    letter-spacing: 0.1em;

    &:hover {
      border: none;
    }
  }
`;
export default HomePage;
