import styled from 'styled-components';
import { FaSketch } from 'react-icons/fa';

export const HomeAbout = () => {
  return (
    <Wrapper>
      <div className="icon">
        <FaSketch className="diamond" />
      </div>
      <p className="aboutus">
        Beads by Kaph is a deluxe brand that makes and sells exquisitely crafted
        beaded accessories. Our products are centered on contemporary, classic
        and timeless designs and are exclusively for stylish people. Kaph
        products include; beaded bags, waistbeads, bracelets, anklets,
        necklaces, beaded body jewelry and phone holders. Our services include
        beaded items for editorials based on orders. Kindly contact the store
        for further enquiries.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
  width: 95%;
  padding: 2rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-gap: 1em;
  .aboutus {
    margin: 0 auto;
    word-spacing: 0.15rem;
    width: 95%;
    font-size: 1.1rem;
    font-weight: 420;
    line-spacing: var(--spacing);
    color: rgba(0, 0, 0, 0.7);
    font-family: script;
    @media (min-width: 576px) {
      width: 75%;
    }
    @media (min-width: 992px) {
      width: 60%;
    }
    @media (min-width: 1280px) {
      width: 50%;
    }
  }

  .diamond {
    font-size: 5rem;
    color: purple;
    margin-bottom: 0.25em;
  }

  @media (min-width: 576px) {
    width: 100%;
  }
  @media (min-width: 1280px) {
    width: 100%;
  }
`;
export default HomeAbout;
