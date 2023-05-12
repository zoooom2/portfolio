import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  }
);
const productSlice = createSlice({
  name: 'product',
  initialState: {
    isSidebarOpen: false,
    products_loading: false,
    products_error: '',
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: '',
    single_product: {},
  },
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products_loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      state.products_loading = false;
      state.products = action.payload;
      state.products_error = '';
      state.featured_products = featured_products;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products_loading = false;
      state.products_error = action.error.message;
    });
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.single_product_loading = false;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.single_products_loading = false;
      state.single_product = action.payload;
      state.single_product_error = '';
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.single_products_loading = false;
      state.single_products_error = action.error.message;
    });
  },
});

export const { openSidebar, closeSidebar } = productSlice.actions;
export default productSlice.reducer;
