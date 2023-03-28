import React from 'react';
import styled from 'styled-components';
import aboutImg from '../assets/image 2.svg';

const AboutPage = () => {
  return <Wrapper className='page-100 section section-center'></Wrapper>;
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 300px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
    margin: 0 auto;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    // grid-template-columns: 1fr 1fr;
  }
  article {
    margin: 0 auto;
    height: calc(auto + 5rem);
    transform: translateY(-5rem);
    // border: 1px solid red;
    padding: 20px;
    box-shadow: var(--light-shadow);
  }
`;
export default AboutPage;
