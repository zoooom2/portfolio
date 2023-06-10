/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios';
import {
  useEffect,
  useReducer,
  createContext,
  useCallback,
  useMemo,
} from 'react';
import reducer from '../../reducers/products_reducer';
import { products_url as url } from '../../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../../actions';
import { ChildrenProps } from '../../types';
import {
  defaultValue,
  initialState,
  ProductsContextValue,
} from '../defaultContextValue/productDefault';

export const ProductsContext =
  createContext<ProductsContextValue>(defaultValue);

export const ProductsProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = useCallback(() => {
    dispatch({ type: SIDEBAR_OPEN });
  }, []);
  const closeSidebar = useCallback(() => {
    dispatch({ type: SIDEBAR_CLOSE });
  }, []);

  const fetchProducts = useCallback(async (url: string) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data.data;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  }, []);

  const fetchSingleProduct = useCallback(async (url: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const single_product = response.data.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: single_product });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  }, []);

  useEffect(() => {
    fetchProducts(url);
  }, [fetchProducts]);

  const value = useMemo(
    () => ({ ...state, openSidebar, closeSidebar, fetchSingleProduct }),
    [closeSidebar, fetchSingleProduct, openSidebar, state]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
