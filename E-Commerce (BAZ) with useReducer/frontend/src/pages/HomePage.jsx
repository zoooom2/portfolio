import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Entry } from '../components';
import ImageSlider from '../components/ImageSlider';
import { useUserContext } from '../context/user_context';
import { featuredSlide1, featuredSlide2 } from '../utils/constants';

const HomePage = () => {
  const { clicked } = useUserContext();
  if (clicked === true) {
    return (
      <Wrapper>
        <div className='left-section'>
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
  border: 1px solid rgba(0, 0, 0, 0.7);
  margin: 1em;
  display: flex;
  flex: 1;
  position: relative;
  .left-section {
    height: 100%;
    width: 50%;
    border-right: 1px solid rgba(0, 0, 0, 0.7);
  }
  .right-section {
    width: 50%;
  }
  .discover-btn {
    background: white;
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
      color: white;
      border: none;
    }
  }
`;
export default HomePage;
