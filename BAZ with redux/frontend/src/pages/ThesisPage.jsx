import { useEffect } from 'react';
import styled from 'styled-components';
import { setClicked } from '../features/userFeature/userSlice';
import { useDispatch } from 'react-redux';
const ThesisPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setClicked(true));
  }, []);

  return (
    <Wrapper className='page-100 flex-column'>
      <h3 className='pageName'>Thesis</h3>
      <main>
        <article className='thesis' title='baz philosophy'>
          <p>
            We do not exist as a singular element. Our genetic make up is a
            stepping stone to our individuality, but even then, our genetic make
            up is not a singular entity. As we grow, we learn and unlearn, we
            experience and we forget, we take and we give back. There’s more
            variation in our individuality per day.
          </p>
          <p>
            {' '}
            The purpose of our life long purpose is to show the power of taking
            from already existing and creating out of it. Originality in
            unoriginal, unoriginal thoughts mixed up to create.
          </p>
          <p>
            {' '}
            We are a community of people who want to experience fashion culture
            in its purest form but without access to it. Our purpose is to take
            from those who do have, we take their knowledge, their history,
            their principles, their thoughts and processes, we take all they
            have and more to create our own defination of fashion from it.
          </p>
          <p>
            {' '}
            Black and low toned garments in our essence because of its
            reliabilty. We do not have to be seen from a distsnce to be of equal
            value. we are the diamond in the dark for those who have the eyes to
            see and light in the dark for those who have kept their eyes shut
            long enough.
          </p>
          <p>
            {' '}
            We celebrate youth culture because this is the tunnel between the
            past and the future, where the paradigm shift begins. We learn the
            rules to break and those to follow and with it an heart aching
            desire for revolution.
          </p>
          <p>
            {' '}
            We will take the ideas, history, principles of the past and present
            to reform our future. we will take from your story to tell our
            story. We will take from you to build the future.
          </p>
        </article>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  align-items: center;
  h3 {
    font-family: 'Zilla Slab';
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    letter-spacing: 0.1em;
    display: flex;
    justify-content: center;
  }
  main {
    width: 100%;
    border-top: 1px solid black;
    margin-top: 1em;
  }
  .thesis {
    width: 50%;
    margin: 3em auto;
    @media (max-width: 768px) {
      width: 100%;
      padding-inline: 2em;
    }
  }
  p {
    font-family: 'Poppins';
    font-size: 16px;
    line-height: 200.5%;
    /* or 32px */
    letter-spacing: 0.1em;
  }
`;
export default ThesisPage;
