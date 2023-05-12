import { useEffect } from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { getUniqueValues } from '../utils/helpers';
import { setClicked } from '../features/userFeature/userSlice';
import {
  filterProduct,
  loadProducts,
  sortProduct,
  updateFilters,
} from '../features/filterFeature/filterSlice';
import { fetchProducts } from '../features/productFeature/productSlice';
import { products_url as url } from '../utils/constants';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { all_products, openFilter, sort, filters } = useSelector(
    (state) => state.filter
  );
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(setClicked(true));
    dispatch(fetchProducts(url));
  }, []);

  useEffect(() => {
    dispatch(filterProduct());
    dispatch(sortProduct());
  }, [products, sort, filters]);

  useEffect(() => {
    dispatch(loadProducts(products));
  }, [products]);

  const collections = getUniqueValues(all_products, 'collectionName');

  return (
    <main>
      <Wrapper className='page flex-column'>
        <div className='pageHero'>
          <select
            className='pageName'
            onChange={(e) => dispatch(updateFilters({name:'collection', value: e.target.value}))}
            name='collection'>
            {collections.map((collection, index) => (
              <option value={collection} key={index}>
                {collection}
              </option>
            ))}
          </select>
        </div>
        <div className='sort-filter'>
          <Sort />
          <div className={`filter ${openFilter && 'open'}`}>
            <Filters />
          </div>
        </div>

        <div className='product-list'>
          <ProductList />
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  padding-block: 0.5rem;

  .pageHero {
    display: flex;
    padding: 1.2em;
    width: 100%;
    border-bottom: 1px solid black;
    justify-content: center;
  }
  .pageName {
    font-family: 'Zilla Slab';
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height */
    border: none;
    outline: none;
    cursor: pointer;
    letter-spacing: 0.1em;
  }
  option {
    background-color: black;
    color: white;
    font-size: 15px;
    padding: 1em;
  }
  .sort-filter {
    width: 100%;
    position: relative;
  }
  .filter {
    top: 100%;
    z-index: 2;
    border-bottom: 1px solid black;
    padding: 1em;
    display: none;
  }
  .product-list {
    padding-bottom: 1em;
  }
  .open {
    display: flex;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
