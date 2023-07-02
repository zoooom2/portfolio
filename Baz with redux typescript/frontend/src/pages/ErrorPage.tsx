import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { setClicked } from '../features/userFeature/userSlice';
import { useAppDispatch } from '../App/hooks';

const ErrorPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = 'Error | Baz Official Store';
    dispatch(setClicked(true));
  }, []);

  return (
    <Wrapper className='page-100 place-center'>
      <section>
        <h1 className='zilla-700'>404</h1>
        <h3 className='zilla-700'>sorry this page doesn&lsquo;t exist</h3>
        <Link to='/'>
          <button type='button' className='btn'>
            Homepage
          </button>
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
  .btn {
    padding-inline: 2em;
    background: black;
    color: white;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export default ErrorPage;
