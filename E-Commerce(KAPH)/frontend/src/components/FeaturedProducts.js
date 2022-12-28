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
import ImageSlider from './imageSlider';

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
        <h2>Featured</h2>
        <div className="underline"></div>
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
        <a href="https://www.instagram.com/beads_by_kaph/">
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
  height: 93vh;
  width: 100%;
  padding-bottom: 4rem;
  .title {
    text-align: left;
    margin: 0 auto;
    height: 10%;
    padding-top: 1rem;
    padding-left: 1.5rem;
  }
  .underline {
    margin-left: 0;
  }
  .imgCtn {
    display: flex;
    justify-content: space-around;
    height: 80%;
    padding-top: 1.5rem;
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
  }

  .imageContainer {
    margin: 0 auto;
    width: 30%;
    height: 100%;

    transition: all 0.2s ease-in-out;
    @media (max-width: 576px) {
      flex: 1;
      &:hover {
        flex: 80%;
      }
    }
  }
`;

export default FeaturedProducts;
