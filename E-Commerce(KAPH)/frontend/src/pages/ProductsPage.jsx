import React from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';

const ProductsPage = () => {
  return (
    <Wrapper>
      <h2>products page</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 10rem);
  margin-top: 5rem;
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
