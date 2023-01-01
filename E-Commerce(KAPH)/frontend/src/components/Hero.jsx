import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroBcg from '../assets/homepage hero images/pexels-king-zubby-13062614.jpg';
import heroBcg2 from '../assets/homepage hero images/pexels-luis-quintero-2360532.jpg';
import heroBcg3 from '../assets/homepage hero images/pexels-alexey-demidov-10562311.jpg';
import heroBcg4 from '../assets/homepage hero images/pexels-ellis-mbeku-633661.jpg';
import heroBcg5 from '../assets/homepage hero images/pexels-ángela-plaza-14435354.jpg';
import { ImageSlider } from './index';

const Hero = () => {
  const slides = [heroBcg, heroBcg2, heroBcg3, heroBcg4, heroBcg5];
  const timer = 4000;
  const message =
    "Season's greetings from everyone at Beads by Kaph!! 🎄🎄 Checkout our exclusive products this holiday ";
  return (
    <Wrapper>
      <Link to="products" className="moving-info">
        <div className="message">{message}</div>
      </Link>
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
  position: relative;
  width: 100%;
  margin: 6rem auto 0 auto;
  overflow: hidden;
  background-color: #d9dddc;
  .moving-info {
    position: absolute;
    width: 100%;
    background-color: var(--clr-black);
    height: 45px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .message {
    color: var(--clr-white);
    display: inline;
    white-space: nowrap;
    font-size: 0.8rem;
    animation: heroMessage 10s 0s linear infinite;
    @keyframes heroMessage {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-80%);
      }
    }

    @media (min-width: 579px) {
      font-size: 1.3em;
      animation: heroMessage 20s linear infinite;
      @keyframes heroMessage {
        0% {
          transform: translateX(100vw);
        }
        100% {
          transform: translateX(-100vw);
        }
      }
    }
  }
  .btnt {
    background-color: rgba(128, 0, 128, 0.5);
    width: auto;
    height: auto;
    padding: 15px;
    font-size: 2rem;
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
    @media (max-width: 576px) {
      font-size: 1.5rem;
    }
  }
`;

export default Hero;
