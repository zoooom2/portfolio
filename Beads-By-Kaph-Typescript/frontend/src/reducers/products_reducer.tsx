import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';
import {
  ProductActionType,
  ProductContextStateType,
  SingleProductType,
} from '../types';

const products_reducer = (
  state: ProductContextStateType,
  action: ProductActionType
): ProductContextStateType => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCCESS: {
      const featuredProductsArray = action.payload as SingleProductType[];
      const featured_products = featuredProductsArray.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        products_loading: false,
        products: action.payload as SingleProductType[],
        products_error: false,
        featured_products,
      };
    }
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload as SingleProductType,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
