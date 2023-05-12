import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { priceFormat, single_product_url as url } from '../utils/constants';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Conditions,
} from '../components';
import styled from 'styled-components';
import { setClicked } from '../features/userFeature/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../features/productFeature/productSlice';
import {
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import useLocalStorage from '../utils/customHooks/localStorage';

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [localStorageCart, setLocalStorageCart] = useLocalStorage('cart', []);
  const navigate = useNavigate();
  const {
    single_products_loading: loading,
    single_products_error: error,
    single_product: product,
  } = useSelector((state) => state.product);
  const { cart, shippingInfo, subtotal } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(setClicked(true));
  }, []);

  const { productName, price, description, images, stock } = product;

  useEffect(() => {
    dispatch(fetchSingleProduct(`${url}${id}`));
  }, [id]);

  useEffect(() => {
    dispatch(updateCartTotal());
    dispatch(countCartTotal());
    setLocalStorageCart(cart);
  }, [cart, shippingInfo, subtotal]);

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

  return (
    <Wrapper>
      <div className='product-picture'>
        <ProductImages images={images} />
      </div>
      <div className='product-details'>
        <div className='product-details-center flex-column'>
          <div className='name-price'>
            <div className='product-name'>{productName}</div>
            <div className='product-price'>{priceFormat(price)}</div>
          </div>
          <p className='desc'>{description}</p>
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
  .product-picture {
    border-right: 1px solid rgba(0, 0, 0, 0.7);
    padding: 1rem;
  }
  .product-details {
    padding: 4rem;
    @media (max-width: 768px) {
      padding: 2rem;
    }
  }
  .product-details-center {
    justify-content: space-around;
    height: 100%;
    gap: 69px;
  }
  .name-price {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .product-name {
    font-family: 'Zilla Slab';
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    letter-spacing: 0.1em;
  }
  .product-price {
    font-family: 'Poppins';
    font-size: 24px;
    line-height: 36px;
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
