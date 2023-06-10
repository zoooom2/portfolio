/* eslint-disable @typescript-eslint/no-empty-function */
import { ProductContextStateType } from '../../types';

export const initialState: ProductContextStateType = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {
    id: '',
    productName: '',
    description: '',
    price: 0,
    priceID: '',
    taxPrice: 0,
    discount: 0,
    color: [],
    featured: false,
    category: 'all',
    reviews: [],
    images: [],
    numberOfReviews: 0,
    stock: 0,
    ratingsAverage: 0,
  },
};

export interface ProductsContextValue extends ProductContextStateType {
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (url: string) => void;
}
export const defaultValue: ProductsContextValue = {
  ...initialState,
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: (_url: string) => {},
};
