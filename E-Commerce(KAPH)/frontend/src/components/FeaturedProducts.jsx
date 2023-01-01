import React from 'react';
import { useProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';
import {
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
} from '../assets/featured images/importFeatured images';
import { ImageSlider } from './index';

const FeaturedProducts = () => {
  const slide1 = [feature1, feature6];
  const slide2 = [feature3, feature4];
  const slide3 = [feature5, feature2];

  const timer1 = 5000;
  const timer2 = 4000;
  const timer3 = 6000;
  return (
    <Wrapper>
      <div className="title">
        <div className="scriptFont">Gallery</div>
        {/* <div className="underline"></div> */}
      </div>
      <div className="imgCtn">
        <div className="imageContainer">
          <ImageSlider slides={slide1} timer={timer1}></ImageSlider>
        </div>
        <div className="imageContainer">
          <ImageSlider slides={slide2} timer={timer3}></ImageSlider>
        </div>
        <div className="imageContainer">
          <ImageSlider slides={slide3} timer={timer2}></ImageSlider>
        </div>
      </div>
      <div className="instaBtnCtn">
        <a
          href="https://www.instagram.com/beads_by_kaph/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button" className="btn instaBtn">
            &gt; find us on instagram &lt;
          </button>
        </a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: rgba(128, 0, 120, 0.4);
  margin: 0 auto;
  height: 100vh;
  width: 100%;

  padding-bottom: 4rem;
  .title {
    text-align: left;
    margin: 0 auto;
    font-weight: 400;
    font-size: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 15%;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    @media (max-width: 576px) {
      font-size: 25px;
    }
  }
  .underline {
    margin-top: 1rem;
  }
  .imgCtn {
    display: flex;
    justify-content: space-around;
    height: 80%;
  }
  .instaBtnCtn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .instaBtn {
    margin: 2em auto;
    padding: 1.2em;
    font-size: 1rem;
    border: transparent;
    cursor: pointer;
    background-color: transparent;
    @media (max-width: 576px) {
      padding: 0.8rem;
      text-align: center;
      width: 100%;
      font-size: 0.7rem;
    }
  }

  .imageContainer {
    margin: 0 auto;
    width: 30%;
    height: 100%;
    box-shadow: var(--dark-shadow);

    transition: all 1s ease-in-out;
    @media (max-width: 790px) {
      flex: 1;
      &:hover {
        flex: 80%;
      }
    }
  }
`;

export default FeaturedProducts;
