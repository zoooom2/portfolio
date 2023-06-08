import styled from 'styled-components';
import logo from '../assets/image 2.svg';

const Loading = () => {
  return (
    <Wrapper className='page-100 section section-center'>
      <img src={logo} alt='logo' />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 25%;
    animation: loading 1s ease-in-out infinite alternate;
    transform-origin: center center;
    @media (max-width: 480px) {
      width: 150px;
    }
  }
  @keyframes loading {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
`;
export default Loading;
