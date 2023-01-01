import styled from 'styled-components';
import { categoryData } from '../utils/constants';

const ShopCategory = () => {
  const categories = categoryData.map((category) => {
    return (
      <div key={category.id} className="category-subcontainer">
        <img
          src={category.image}
          alt={category.text}
          className="category-image"
        />
        <div className="category-name">{category.text}</div>
      </div>
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
    border: 1px solid red;
    margin-block: 1rem;
  }
  .category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
    &:hover {
      opacity: 0.5;
    }
  }
  .category
`;
export default ShopCategory;
