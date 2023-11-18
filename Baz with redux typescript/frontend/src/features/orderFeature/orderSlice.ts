import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartStateType, OrderStateType } from '../../types';

export const createOrder = createAsyncThunk(
  'order/create',
  async ({ body, reference }: { body: CartStateType; reference: string }) => {
    const url = `https://baz-api.onrender.com/api/v1/order/paystack/createOrder`;
    const response = await axios.post(
      url,
      { ...body, reference },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  loading: false,
  create_order_error: '',
} as OrderStateType;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.create_order_error = '';
        state.orders = [...state.orders, action.payload];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.create_order_error = action.error.message as string;
      });
  },
});

// export const {

// } = orderSlice.actions;
export default orderSlice.reducer;
