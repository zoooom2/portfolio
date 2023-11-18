import { useEffect } from 'react';
import styled from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { setClicked } from '../features/userFeature/userSlice';
import {
  filterProduct,
  loadProducts,
  sortProduct,
  updateCollectionProduct,
  updateFilters,
} from '../features/filterFeature/filterSlice';
import { fetchProducts } from '../features/productFeature/productSlice';
import { products_url as url } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../App/hooks';
// import { Filters, Sort } from '../features/filterFeature/filter';
import ProductList from '../features/productFeature/product/ProductList';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { all_products, filtered_product, filtered_collection, sort, filters } =
    useAppSelector((state) => state.filter);
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    document.title = 'Shop | Baz Official Store';
    dispatch(fetchProducts(url));
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

  const { category } = filters;

  const categories = getUniqueValues(filtered_collection, 'category');
  const collections = getUniqueValues(all_products, 'collectionName');

  return (
    <main>
      <Wrapper className='page flex-column'>
        <div className='flex justify-center py-[45px] border-b border-black w-fit'>
          <select
            name='collection'
            className='font-baz2 text-[20px] font-semibold tracking-[2px] bg-baz-white outline-none w-fit'
            onChange={(e) => {
              dispatch(
                updateFilters({ name: 'collection', value: e.target.value })
              );
              dispatch(updateFilters({ name: 'category', value: 'all' }));
              const filtered = all_products.filter((p) =>
                e.target.value === 'all'
                  ? all_products
                  : p.collectionName === e.target.value
              );
              dispatch(updateCollectionProduct(filtered));
            }}>
            <option value={'all'} className='text-center'>
              All
            </option>
            {collections.map((collection, index) => (
              <option value={collection} key={index} className='text-center'>
                {collection}
              </option>
            ))}
          </select>
        </div>
        <div className='pageHero'>
          <div className='font-baz3 text-[14px] font-normal tracking-[1.4px]'>
            {filtered_product.length} Results
          </div>
          <select
            className='pageName bg-baz-white text-baz-black text-[14px] tracking-[1.4px] font-baz3 cursor-pointer'
            value={category}
            onChange={(e) =>
              dispatch(
                updateFilters({ name: 'category', value: e.target.value })
              )
            }
            name='category'>
            <option className='capitalize flex justify-around' value={'all'}>
              Shop All
            </option>
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* <div className='sort-filter max-tablet:hidden'>
          <Sort />
          <div className={`filter ${openFilter && 'open'}`}>
            <Filters />
          </div>
        </div> */}

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
    justify-content: space-between;
    align-items: center;
  }
  .pageName {
    line-height: 24px;
    /* identical to box height */
    border: none;
    outline: none;
  }
  option {
    background-color: black;
    color: #d3d3d3;
    font-size: 10px;
    padding: 1em;
    font-family: 'Poppins';
    letter-spacing: 1.4px;
  }
  .sort-filter {
    width: 100%;
    position: relative;
  }
  // .z {
  //   z-index: 999999;
  // }
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
