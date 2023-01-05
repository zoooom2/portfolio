import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import reviews from '../assets/reviews/reviews';
import { services } from '../utils/constants';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    let review = setInterval(() => {
      const isLastReview = currentIndex === reviews.length - 1;
      const newIndex = isLastReview ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 7000);
    return () => clearInterval(review);
  }, [currentIndex]);
  return (
    <Wrapper>
      <div className="title">
        <div className="scriptFont">Reviews</div>
        {/* <div className="underline"></div> */}
        <div className="rvw-ctn">
          <p className="reviews">{reviews[currentIndex].text}</p>
          <p className="reviewer">{`-${reviews[currentIndex].name}`}</p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 350px;
  .title {
    text-align: left;
    margin: 0 auto;
    margin-top: 1rem;
    width: 95%;
    padding-top: 1rem;
    padding-left: 1.5rem;
    font-size: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 992px) {
      width: 50%;
    }
  }
  .underline {
    margin-left: 0;
  }
  .rvw-ctn {
    padding: 1rem;
  }
  .reviews {
    font-size: 1.1rem;
    font-weight: 420;
    line-spacing: var(--spacing);
    color: rgba(0, 0, 0, 0.7);
  }
  .reviewer {
    font-size: 1.1rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.7);
    text-align: right;
    text-transform: capitalize;
    padding-right: 1rem;
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 1280px) {
    .section-center {
    }
  }
`;
export default Testimonials;
