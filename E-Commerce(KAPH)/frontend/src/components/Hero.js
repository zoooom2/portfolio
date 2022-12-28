import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroBcg from '../assets/homepage hero images/pexels-king-zubby-13062614.jpg';
import heroBcg2 from '../assets/homepage hero images/pexels-luis-quintero-2360532.jpg';
import heroBcg3 from '../assets/homepage hero images/pexels-alexey-demidov-10562311.jpg';
import heroBcg4 from '../assets/homepage hero images/pexels-ellis-mbeku-633661.jpg';
import heroBcg5 from '../assets/homepage hero images/pexels-ángela-plaza-14435354.jpg';
import ImageSlider from './imageSlider';

const Hero = () => {
  const slides = [heroBcg, heroBcg2, heroBcg3, heroBcg4, heroBcg5];
  const timer = 4000;
  return (
    <Wrapper>
      <Link to="/products" className="productLink">
        <button type="button" className="btn btnt">
          SHOP NOW
        </button>
      </Link>
      <ImageSlider slides={slides} timer={timer} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 90vh;
  width: 100%;
  margin: 6rem auto 0 auto;
  overflow: hidden;
  background-color: #d9dddc;
  .btnt {
    background-color: rgba(128, 0, 128, 0.5);
    width: auto;
    height: auto;
    padding: 15px;
    font-size: 30px;
    color: white;
    position: absolute;
    border-radius: var(--radius);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    opacity: 1;
    z-index: 5;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      background-color: purple;
    }
  }
`;

export default Hero;
