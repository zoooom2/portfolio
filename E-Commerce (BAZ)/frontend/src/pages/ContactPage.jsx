import styled from 'styled-components';
import { BsTwitter, BsInstagram } from 'react-icons/bs';

const ContactPage = () => {
  return (
    <Wrapper>
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
          <ul>
            <li>
              <BsTwitter />
              <a
                href='https://instagram.com/baz.ng?igshid=YmMyMTA2M2Y='
                target='_blank'
                rel='noreferrer'>
                <span>@baz.ng</span>
              </a>
            </li>
            <li>
              <BsInstagram />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  .pageName {
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    letter-spacing: 0.1em;
    display: flex;
    justify-content: center;
    margin: 1.5em;
  }
  main {
    width: 100%;
    border-block: 1px solid black;
    display: flex;
    width: 100%;
    flex: 1;
  }
  main > * {
    display: flex;
    flex-direction: column;
    width: calc(100% / 3);
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 200.5%;
    /* or 40px */
    letter-spacing: 0.1em;
  }
  main > * > h3 {
    border-bottom: 1px solid black;
    padding: 0.2em;
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    letter-spacing: 0.1em;
    display: flex;
    justify-content: center;
  }
  main > * > a {
    margin: auto auto;
    padding: 2em;
  }
  .mail {
    border-inline: 1px solid black;
  }
  a {
    color: black;
  }
  span {
    &:hover {
      text-decoration: underline;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 2em;
  }
  li {
    display: flex;
    align-items: center;
    gap: 2em;
  }
`;
export default ContactPage;
