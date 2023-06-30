import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductStateType, SingleProductType } from '../../types';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (url: string) => {
    const response = await axios.get(url);
    return response.data.data;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (url: string) => {
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
    single_product: {
      _id: '',
      productName: '',
      description: '',
      featured: false,
      price: 0,
      priceID: '',
      taxPrice: 0,
      sizes: [],
      discount: 0,
      category: 'all',
      collectionName: 'all',
      quantitySold: 0,
      reviews: [],
      images: [],
      numberOfReviews: 0,
      stock: 0,
      ratingsAverage: 0,
    },
  } as ProductStateType,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products_loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: { type: string; payload: SingleProductType[] }) => {
        const featured_products = action.payload.filter(
          (product) => product.featured === true
        );
        state.products_loading = false;
        state.products = action.payload;
        state.products_error = '';
        state.featured_products = featured_products;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products_loading = false;
      state.products_error = action.error.message as string;
    });
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.single_product_loading = false;
    });
    builder.addCase(
      fetchSingleProduct.fulfilled,
      (state, action: { payload: SingleProductType }) => {
        state.single_product_loading = false;
        state.single_product = action.payload;
        state.single_product_error = '';
      }
    );
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.single_product_loading = false;
      state.single_product_error = action.error.message as string;
    });
  },
});

export const { openSidebar, closeSidebar, removeProduct } =
  productSlice.actions;
export default productSlice.reducer;
