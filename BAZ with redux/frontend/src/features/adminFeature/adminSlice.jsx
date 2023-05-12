import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { priceFormat } from '../../utils/constants';

export const fetchOrderStats = createAsyncThunk(
  'admin/fetchOrderStats',
  async (period) => {
    const response = await axios.get(`/api/v1/order/pctchange?time=${period}`);
    return response.data.stats;
  }
);
export const fetchVisitorStats = createAsyncThunk(
  'admin/fetchVisitorStats',
  async (period) => {
    const response = await axios.get(
      `/api/v1/visitor/pctchange?time=${period}`
    );
    return response.data.stats;
  }
);

export const fetchRecentOrder = createAsyncThunk(
  'admin/fetchRecentOrder',
  async () => {
    const response = await axios.get('/api/v1/order?limit=5');
    return response.data.data;
  }
);

export const fetchBestSeller = createAsyncThunk(
  'admin/fetchBestSeller',
  async () => {
    const response = await axios.get(
      '/api/v1/products?sort=quantitySold&limit=3'
    );
    return response.data.data;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: true,
    fetch_order_stat_error: '',
    fetch_visitor_stat_error: '',
    fetch_recent_order_error: '',
    fetch_best_seller_error: '',
    period: 'monthly',
    totalRevenue: 0,
    previousTotalRevenue: 0,
    totalOrder: 0,
    previousTotalOrder: 0,
    visitor: 0,
    previousVisitor: 0,
    totalSale: 0,
    previousTotalSales: 0,
    percentageRevenue: priceFormat(0),
    percentageOrder: 0,
    percentageVisitor: 0,
    percentageSales: 0,
    recentOrders: [],
    bestSeller: [],
  },
  reducers: {
    changeTimeRange: (state, action) => {
      state.period = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderStats.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchOrderStats.fulfilled, (state, action) => {
      console.log(action.payload);
      state = {
        ...state,
        loading: false,
        fetch_order_stat_error: '',
        totalRevenue: priceFormat(action.payload[1].current),
        percentageRevenue: action.payload[1].percentageDifference,
        totalSale: action.payload[0].current,
        percentageSales: action.payload[0].percentageDifference,
        totalOrder: action.payload[2].current,
        percentageOrder: action.payload[2].percentageDifference,
        previousTotalRevenue: priceFormat(action.payload[1].previous),
        previousTotalSales: action.payload[0].previous,
        previousTotalOrder: action.payload[2].previous,
      };
    });
    builder.addCase(fetchOrderStats.rejected, (state, action) => {
      state.loading = false;
      state.totalRevenue = priceFormat(0);
      state.percentageRevenue = 0;
      state.totalSale = 0;
      state.percentageSales = 0;
      state.totalOrder = 0;
      state.percentageOrder = 0;
      state.previousTotalRevenue = priceFormat(0);
      state.previousTotalSales = 0;
      state.previousTotalOrder = 0;
      state.fetch_order_stat_error = action.error.message;
    });
    builder.addCase(
      fetchVisitorStats.pending,
      (state) => (state.loading = true)
    );
    builder.addCase(fetchVisitorStats.fulfilled, (state, action) => {
      state.fetch_visitor_stat_error = '';
      state.loading = false;
      state.visitor = action.payload[0].current;
      state.previousVisitor = action.payload[0].previous;
      state.percentageVisitor = action.payload[0].percentageDifference;
    });
    builder.addCase(fetchVisitorStats.rejected, (state, action) => {
      state.loading = false;
      state.fetch_visitor_stat_error = action.error.message;
      state.visitor = 0;
      state.previousVisitor = 0;
      state.percentageVisitor = 0;
    });
    builder.addCase(fetchBestSeller.pending, (state) => (state.loading = true));
    builder.addCase(fetchBestSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.fetch_best_seller_error = '';
      state.bestSeller = action.payload;
    });
    builder.addCase(fetchBestSeller.rejected, (state, action) => {
      state.loading = false;
      state.fetch_best_seller_error = action.error.message;
      state.bestSeller = [];
    });
    builder.addCase(fetchRecentOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecentOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.fetch_recent_order_error = '';
      state.recentOrders = action.payload;
    });
    builder.addCase(fetchRecentOrder.rejected, (state, action) => {
      state.loading = false;
      state.fetch_recent_order_error = action.error.message;
      state.recentOrders = [];
    });
  },
});

export const { changeTimeRange } = adminSlice.actions;
export default adminSlice.reducer;
