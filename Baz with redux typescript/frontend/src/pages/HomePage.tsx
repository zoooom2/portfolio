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
        <div className='left-section border-r border-baz-black'>
          <ImageSlider slides={featuredSlide1} timer={3001} />
        </div>
        <div className='right-section'>
          <ImageSlider slides={featuredSlide2} timer={5001} />
        </div>
        <Link to='/shop' className='discover-btn'>
          DISCOVER
        </Link>
      </Wrapper>
    );
  }
  return (
    <>
      <Entry />
    </>
  );
};

const Wrapper = styled.main`
  height: calc(100vh - (5em + 70px));
  margin: 1em;
  display: flex;
  flex: 1;
  position: relative;
  .left-section {
    height: 100%;
    width: 50%;
  }
  .right-section {
    width: 50%;
  }
  .discover-btn {
    background: #f9f8f8;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 16px 24px;
    font-family: Zilla Slab, serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.1em;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      background: rgba(0, 0, 0, 0.8);
      border: none;
      color: #f9f8f8;
    }
  }
`;
export default HomePage;
