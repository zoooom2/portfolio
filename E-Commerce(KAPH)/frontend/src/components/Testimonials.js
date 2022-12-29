import React from 'react';
import styled from 'styled-components';
import { services } from '../utils/constants';

const Testimonials = () => {
  return (
    <Wrapper>
      <div className="title">
        <h2>Testimonials</h2>
        <div className="underline"></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 50%;
  .title {
    text-align: left;
    margin: 0 auto;
    height: 10%;
    padding-top: 1rem;
    padding-left: 1.5rem;
  }
  .underline {
    margin-left: 0;
  }

  @media (min-width: 992px) {
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
    }
  }
`;
export default Testimonials;
