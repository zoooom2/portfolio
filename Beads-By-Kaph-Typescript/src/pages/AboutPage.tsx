import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/kaph-logo.svg';

const AboutPage = () => {
  return (
    <Wrapper className="page-100 section section-center">
      {/* <img src={aboutImg} alt="aboutImage" /> */}
      <article>
        <div className="title">
          <h2 className="scriptFont">about us</h2>
        </div>
        <p>
          Beads by Kaph is a deluxe brand that makes and sells exquisitely
          crafted beaded accessories. Our products are centered on contemporary,
          classic and timeless designs and are exclusively for stylish people.
          Kaph products include; beaded bags, waistbeads, bracelets, anklets,
          necklaces, beaded body jewelry and phone holders. Our services include
          beaded items for editorials based on orders. Kindly contact the store
          for further enquiries.
        </p>
      </article>
    </Wrapper>
  );
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
