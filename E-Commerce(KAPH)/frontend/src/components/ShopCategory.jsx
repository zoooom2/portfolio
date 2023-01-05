import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { categoryData } from '../utils/constants';

const ShopCategory = () => {
  const categories = categoryData.map((category) => {
    return (
      <Link
        to={`/products?category=${category.text}`}
        key={category.id}
        className="category-subcontainer"
        // style={{ backgroundImage: `url("${category.image}")` }}
      >
        <img
          src={category.image}
          alt={category.text}
          className="category-image"
        />
        <div className="category-name">{category.text}</div>
      </Link>
    );
  });
  return (
    <Wrapper>
      <div className="title">
        <div className="scriptFont">Shop By Category</div>
      </div>
      <div className="category-container">{categories}</div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);

  .title {
    text-align: left;
    margin: 0 auto;
    margin-block: 1rem;
    width: 95%;
    font-size: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 992px) {
      width: 50%;
    }
  }
  .category-container {
    display: flex;
    flex-wrap: wrap;
    align-items: space-around;
    justify-content: space-around;
    width: 100%;
  }
  .category-subcontainer {
    width: 23%;
    height: auto;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.25rem;
    background-size: cover;
    flex-basis: 45%;
    overflow: hidden;
    margin-block: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: var(--transition);
    &:hover {
      border: 2px solid purple;
      box-shadow: var(--dark-shadow);
    }
    @media (min-width: 768px) {
      flex-basis: 31%;
    }
    @media (min-width: 998px) {
      flex-basis: 300px;
    }
  }
  .category-image {
    width: 100%;
    height: 90%;
    object-fit: cover;
    transition: var(--transition);
  }
  .category-name {
    width: 100%;
    color: purple;
    font-size: 0.6rem;
    display: grid;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: var(--spacing);
    height: 10%;
    
    @media (min-width: 500px) {
      font-size: 1rem;
  }
`;
export default ShopCategory;
