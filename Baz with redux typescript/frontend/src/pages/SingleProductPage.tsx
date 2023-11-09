import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { priceFormat, single_product_url as url } from '../utils/constants';
import styled from 'styled-components';
import { setClicked } from '../features/userFeature/userSlice';
import { fetchSingleProduct } from '../features/productFeature/productSlice';
import {
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import useLocalStorage from '../utils/customHooks/localStorage';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { Error, Loading } from '../global_components';
import ProductImages from '../features/productFeature/product/ProductImages';
import { AddToCart } from '../features/cartFeature/cart';
import { Conditions } from '../features/cartFeature/checkout';

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-unused-vars
  const [_localStorageCart, setLocalStorageCart] = useLocalStorage('cart', []);
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = useAppSelector((state) => state.product);
  const { cart, subtotal } = useAppSelector((state) => state.cart);
  const { productName, price, description, images, stock } = product;
  useEffect(() => {
    dispatch(setClicked(true));
    document.title = `Shop | Baz Official Store`;
  }, []);

  useEffect(() => {
    dispatch(fetchSingleProduct(`${url}${id}`));
  }, [id]);

  useEffect(() => {
    dispatch(updateCartTotal());
    dispatch(countCartTotal());
    setLocalStorageCart(cart);
  }, [cart, subtotal]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  // .product-picture {
  //     border-right: 1px solid rgba(0, 0, 0, 0.7);
  //     padding: 1rem;
  //   }

  return (
    <Wrapper>
      <div className='border-r border-[rgba(0,0,0,0.7)] p-6 max-tablet:border-b w-full tablet:h-screen h-[80vh]'>
        <ProductImages images={images} />
      </div>
      <div className='product-details'>
        <div className='product-details-center flex-column max-tablet:gap-[46px] gap-[69px]'>
          <div className='flex flex-col gap-[18px] tablet:gap-[48px]'>
            <div className='name-price'>
              <div className='product-name max-tablet:text-[18px] max-tablet:tracking-[1.6px]'>
                {productName}
              </div>
              <div className='product-price tablet:font-normal tablet:text-[24px]'>
                {priceFormat(price)}
              </div>
            </div>
            <p className='desc'>{description}</p>
          </div>

          {stock > 0 ? (
            <AddToCart product={product} />
          ) : (
            <button className='sold-out-btn' disabled>
              Sold Out
            </button>
          )}
          <Conditions />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
  // .product-picture {
  //   border-right: 1px solid rgba(0, 0, 0, 0.7);
  //   padding: 1rem;
  // }
  .product-details {
    padding: 4rem;
    @media (max-width: 768px) {
      padding: 2rem;
    }
  }
  .product-details-center {
    justify-content: space-around;
    height: 100%;
    // gap: 69px;
  }
  .name-price {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .product-name {
    font-family: 'Poppins';
    font-size: 16px;
    /* identical to box height */
    letter-spacing: 2.4px;
    font-weight: 600;
  }
  .product-price {
    font-family: 'Poppins';
    font-size: 16px;
  }
  .desc {
    font-family: 'Poppins';
    font-size: 15px;
    line-height: 25px;
    letter-spacing: 0.02em;
  }
  .size {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
  }
  .size-guide {
    font-family: 'Bell MT';
    font-size: 18px;
    line-height: 20px;
    /* identical to box height */
    margin-left: auto;
    text-decoration-line: underline;
  }
  .size-select {
    padding: 31.5px 24px;
    gap: 15px;
    width: 100%;
    border: 1.5px solid black;
    // drop down arrow
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.5rem center;
    background-size: 1em;
    cursor: pointer;
  }
  .add-cart-btn,
  .sold-out-btn {
    padding-block: 1em;
    gap: 15px;
    background: #000000;
    border: 1.5px solid #000000;
    width: 100%;
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    color: #ffffff;
    transition: var(--transition);
    cursor: pointer;
    &:hover {
      transform: scale(1.01);
    }
  }
  .sold-out-btn {
    background: transparent !important;
    color: grey;
    border-color: grey !important;
    &:hover {
      transform: scale(1);
    }
  }
`;

export default SingleProductPage;
