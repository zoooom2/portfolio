import { createSlice } from '@reduxjs/toolkit';
import {
  CategoryType,
  FilterStatetype,
  FilterType,
  SingleProductType,
} from '../../types';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filtered_product: [],
    filtered_collection: [],
    all_products: [],
    grid_view: false,
    sort: 'price-lowest',
    openFilter: false,
    openSearchBar: false,
    filters: {
      text: '',
      category: 'all',
      min_price: undefined,
      max_price: undefined,
      price: 0,
      shipping: false,
      collection: 'all',
    },
  } as FilterStatetype,
  reducers: {
    loadProducts: (state, action: { payload: SingleProductType[] }) => {
      const productPrices = action.payload.map((p) => p.price);
      const max = Math.max(...productPrices);
      const min = Math.min(...productPrices);
      state.all_products = [...action.payload];
      state.filtered_product = [...action.payload];
      state.filtered_collection = [...action.payload];
      state.filters = {
        ...state.filters,
        max_price: max,
        price: max,
        min_price: min,
      };
    },
    setGridView: (state) => {
      state.grid_view = true;
    },
    setListView: (state) => {
      state.grid_view = false;
    },

    sortProduct: (state) => {
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

      state.filtered_product = tempProducts;
    },
    updateSort: (state, action: { payload: string }) => {
      state.sort = action.payload;
    },
    filterProduct: (state) => {
      const { all_products } = state;
      const { text, category, price, collection } = state.filters;
      let temp = [...all_products];
      if (text) {
        temp = temp.filter((product) =>
          product.productName.toLowerCase().includes(text)
        );
      }
      if (category !== 'all') {
        temp = temp.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
      }
      // if (color !== 'all') {
      //   temp = temp.filter((product) => product.color.find((c) => c === color));
      // }
      temp = temp.filter((product) => product.price <= price);
      if (collection !== 'all') {
        temp = temp.filter(
          (product) =>
            product.collectionName.toLowerCase() === collection.toLowerCase()
        );
      }
      state.filtered_product = temp;
    },
    updateFilters: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof FilterType;
        value: string | CategoryType | boolean | number;
      } = action.payload;
      state.filters = { ...state.filters, [name]: value };
    },
    updateCollection: (state, action) => {
      state.filters = {
        ...state.filters,
        collection: action.payload,
        category: 'all',
      };

      const filtered = state.all_products.filter((p) =>
        action.payload === 'all'
          ? state.all_products
          : p.collectionName.toLowerCase() === action.payload.toLowerCase()
      );

      state.filtered_collection = [...filtered];
    },

    toggleFilter: (state) => {
      state.openFilter = !state.openFilter;
    },
    clearFilters: (state) => {
      state.filters = {
        text: '',
        category: 'all',
        min_price: 0,
        max_price: state.filters.max_price,
        price: state.filters.max_price || 0,
        shipping: false,
        collection: 'all',
      };
    },
    openSearchBar: (state) => {
      state.openSearchBar = true;
    },
    closeSearchBar: (state) => {
      state.openSearchBar = false;
    },
  },
});

export const {
  loadProducts,
  setGridView,
  setListView,
  sortProduct,
  updateSort,
  filterProduct,
  updateFilters,
  toggleFilter,
  clearFilters,
  updateCollection,
  openSearchBar,
  closeSearchBar,
} = filterSlice.actions;

export default filterSlice.reducer;
