import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { useSearchParams } from 'react-router-dom';

import {
  filterProduct,
  loadProducts,
  sortProduct,
  updateCollection,
  // updateCollectionProduct,
  updateFilters,
} from '../features/filterFeature/filterSlice';
import { fetchProducts } from '../features/productFeature/productSlice';

import { useAppDispatch, useAppSelector } from '../App/hooks';

import ProductList from '../features/productFeature/product/ProductList';
import { Loading } from '../global_components';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { all_products, filtered_product, filtered_collection, sort, filters } =
    useAppSelector((state) => state.filter);
  const { products, products_loading } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    document.title = 'Shop | Baz Official Store';
    dispatch(fetchProducts());
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(filterProduct());
    dispatch(sortProduct());
  }, [products, sort, filters]);

  useEffect(() => {
    dispatch(loadProducts(products));
  }, [products]);

  useEffect(() => {
    const category = searchParams.get('category');
    const collection = searchParams.get('collection');
    if (collection) {
      dispatch(updateCollection(collection.toLowerCase()));
    }
    if (category) {
      dispatch(
        updateFilters({ name: 'category', value: category.toLowerCase() })
      );
    }
  }, [dispatch, searchParams]);

  const handleCollectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCollection(e.target.value));
    if (e.target.value === 'all') {
      searchParams.delete('collection');
    } else {
      searchParams.set('collection', e.target.value);
    }
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilters({ name: 'category', value: e.target.value }));
    if (e.target.value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', e.target.value);
    }
    setSearchParams(searchParams);
  };

  const { category, collection } = filters;

  const categories = getUniqueValues(filtered_collection, 'category');
  const collections = getUniqueValues(all_products, 'collectionName');

  if (products_loading) {
    return <Loading />;
  } else {
    return (
      <main>
        <Wrapper className='page flex-column'>
          <div className='flex justify-center py-[45px] border-b border-black'>
            <select
              name='collection'
              className='font-baz2 text-[20px] font-semibold tracking-[2px] bg-baz-white outline-none w-fit'
              value={collection}
              onChange={handleCollectionChange}>
              <option value={'all'} className='text-center'>
                All
              </option>
              {collections.map((collection, index) => (
                <option
                  value={collection.toLowerCase()}
                  key={index}
                  className='text-center'>
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
              onChange={handleCategoryChange}
              name='category'>
              <option className='capitalize flex justify-around' value={'all'}>
                Shop All
              </option>
              {categories.map((category, index) => (
                <option value={category.toLowerCase()} key={index}>
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
  }
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
