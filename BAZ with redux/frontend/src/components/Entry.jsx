import styled from 'styled-components';
import logo from '../assets/image 2.svg';
import { setClicked } from '../features/userFeature/userSlice';
import { useDispatch } from 'react-redux';
const Entry = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper
      className='flex-column place-center'
      onClick={() => dispatch(setClicked(true))}>
      <img src={logo} alt='' className='logo' />
      <p>click to enter</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  cursor: pointer;
  img {
    width: 60%;
    @media (min-width: 768px) {
      width: 400px;
    }
  }
  p {
    font-family: 'Zilla Slab';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.255em;
    margin-top: 2em;
  }
`;

export default Entry;
