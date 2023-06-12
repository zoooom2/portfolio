import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filtered_product: [],
    all_products: [],
    grid_view: true,
    sort: 'price-lowest',
    openFilter: false,
    filters: {
      text: '',
      category: 'all',
      color: 'all',
      min_price: 0,
      max_price: 0,
      price: 0,
      shipping: false,
      collection: 'all',
    },
  },
  reducers: {
    loadProducts: (state, action) => {
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      state.all_products = [...action.payload];
      state.filtered_product = [...action.payload];
      state.filters = {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
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
      let tempProducts = [];

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
    updateSort: (state, action) => {
      state.sort = action.payload;
    },
    filterProduct: (state) => {
      const { all_products } = state;
      const { text, category, color, price, collection } = state.filters;
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
      if (collection !== 'all') {
        temp = temp.filter((product) => product.collectionName === collection);
      }
      state.filtered_product = temp;
    },
    updateFilters: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },
    toggleFilter: (state) => {
      state.openFilter = !state.openFilter;
    },
    clearFilters: (state) => {
      state.filters = {
        text: '',
        category: 'all',
        color: 'all',
        min_price: 0,
        max_price: state.filters.max_price,
        price: state.filters.max_price,
        shipping: false,
        collection: 'all',
      };
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
} = filterSlice.actions;

export default filterSlice.reducer;
