import styled from 'styled-components';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { useEffect } from 'react';
import { setClicked } from '../features/userFeature/userSlice';
import { useAppDispatch } from '../App/hooks';

const ContactPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setClicked(true));
  }, []);

  return (
    <Wrapper className='flex-column'>
      <h3 className='pageName'>Contact</h3>
      <main>
        <div className='call'>
          <h3> Call Baz @</h3>
          <a href='tel:09036994176'>
            <span>09036994176</span>
          </a>
        </div>
        <div className='mail'>
          <h3>Mail Baz @</h3>
          <a href='mailto:Bazonlineshop@gmail.com'>
            <span>Bazonlineshop@gmail.com</span>
          </a>
        </div>
        <div className='social-media'>
          <h3>Social Media</h3>
          <ul className='flex-column'>
            <li>
              <BsInstagram />
              <a
                href='https://instagram.com/baz.ng?igshid=YmMyMTA2M2Y='
                target='_blank'
                rel='noreferrer'>
                <span>@baz.ng</span>
              </a>
            </li>
            <li>
              <BsTwitter />

              <a
                href='https://twitter.com/baz_online?s=21&t=BPQsKKo2HG-RqbP6lp1YIg'
                target='_blank'
                rel='noreferrer'>
                <span>@baz_online</span>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  align-items: center;
  width: 100%;
  .pageName {
    font-family: 'Zilla Slab';
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    letter-spacing: 0.1em;
    display: flex;
    justify-content: center;
    margin: 1.5em;
    width: 100%;
  }
  main {
    border-block: 1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    @media (max-width: 927px) {
      grid-template-columns: 1fr;
      gap 1em;
      
      
    }
  }
  main > * {
    display: flex;
    flex-direction: column;
    font-family: 'Poppins';
    font-size: 20px;
    line-height: 200.5%;
    letter-spacing: 0.1em;
    
  }
  main > * > h3 {
    border-bottom: 1px solid black;
    padding: 0.2em;
    font-family: 'Zilla Slab';
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    /* identical to box height */
    letter-spacing: 0.1em;
    display: flex;
    justify-content: center;
   
  }
  main > * > a {
    display:grid;
    place-items:center;
    padding-block: 1em;
    
  }
  .mail {
    border-inline: 1px solid black;
    @media(max-width:927px){
      border-inline:none;
    }
  }
  a {
    color: black;
  }
  span {
     @media(max-width:380px){
      font-size:16px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  ul {
    padding: 2em;
  }
  li {
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 2em;
  }
`;
export default ContactPage;
