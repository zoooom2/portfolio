import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import {
  FilterActionType,
  FilterContextStatetype,
  SingleProductType,
} from '../types';

const filter_reducer = (
  state: FilterContextStatetype,
  action: FilterActionType
): FilterContextStatetype => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const { products } = action.payload as { products: SingleProductType[] };
      const maxPrice = products.map((p) => p.price);
      const max = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...products],
        filtered_product: [...products],
        filters: { ...state.filters, max_price: max, price: max },
      };
    }
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT: {
      const { sort } = action.payload as Pick<FilterContextStatetype, 'sort'>;
      return { ...state, sort };
    }
    case SORT_PRODUCTS: {
      const { sort, filtered_product } = state;
      let tempProducts: SingleProductType[] = [];

      if (sort === 'price-lowest') {
        tempProducts = filtered_product.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
        tempProducts = filtered_product.sort((a, b) => b.price - a.price);
      }

      if (sort === 'name-a') {
        tempProducts = filtered_product.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
      }

      if (sort === 'name-z') {
        tempProducts = filtered_product.sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
      }

      return { ...state, filtered_product: tempProducts };
    }
    case UPDATE_FILTERS: {
      const { name, value } = action.payload as {
        name: string;
        value: string | boolean | null;
      };
      return { ...state, filters: { ...state.filters, [name]: value } };
    }
    case FILTER_PRODUCTS: {
      const { all_products } = state;
      const { text, category, color, price, shipping } = state.filters;
      let temp = [...all_products];
      if (text) {
        temp = temp.filter((product) =>
          product.productName.toLowerCase().startsWith(text)
        );
      }
      if (category !== 'all') {
        temp = temp.filter((product) => product.category === category);
      }
      if (color !== 'all') {
        temp = temp.filter((product) => product.color.find((c) => c === color));
      }
      temp = temp.filter((product) => product.price <= price);
      // if (shipping) {
      //   temp = temp.filter((product) => product.shipping === true);
      // }
      return { ...state, filtered_product: temp };
    }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
