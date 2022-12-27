import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/hero-bcg.jpeg';

const AboutPage = () => {
  return (
    <Wrapper className="page section section-center">
      <img src={aboutImg} alt="about image" />
      <article>
        <div className="title">
          <h2>about us</h2>
          <div className="underline"></div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          blanditiis corporis voluptas omnis pariatur ratione repellendus odit
          expedita soluta consequatur atque aliquam repudiandae, natus eligendi!
          Cumque unde placeat corporis quaerat, iure laborum repudiandae
          veritatis eos modi molestias nam necessitatibus rerum quasi iste, rem
          illo sequi eligendi. Ducimus deleniti unde distinctio sunt!
          Consequatur saepe natus eligendi vel tempore sapiente. Natus
          perferendis est doloremque veritatis, rerum dolorum nobis aliquid, et
          sint alias aspernatur numquam eaque dolorem assumenda praesentium
          adipisci dolore magnam doloribus pariatur exercitationem asperiores in
          ut! Accusamus ut, quo, soluta voluptatibus eaque assumenda inventore
          ex quasi, repellat commodi dignissimos ad pariatur.
        </p>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
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
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
