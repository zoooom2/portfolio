import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminState, OrderType } from '../../types';

export const fetchOrderStats = createAsyncThunk(
  'admin/fetchOrderStats',
  async (period: string) => {
    const response = await axios.get(
      `https://baz-api.onrender.com/api/v1/order/pctchange?time=${period}`
    );

    return response.data.stats;
  }
);
export const fetchVisitorStats = createAsyncThunk(
  'admin/fetchVisitorStats',
  async (period: string) => {
    const response = await axios.get(
      `https://baz-api.onrender.com/api/v1/visitor/pctchange?time=${period}`
    );
    return response.data.stats;
  }
);

export const fetchOrders = createAsyncThunk('admin/fetchOrders', async () => {
  const response = await axios.get('https://baz-api.onrender.com/api/v1/order');
  return response.data.data;
});

export const fetchBestSeller = createAsyncThunk(
  'admin/fetchBestSeller',
  async () => {
    const response = await axios.get(
      'https://baz-api.onrender.com/api/v1/products?sort=quantitySold&limit=3'
    );
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (data: FormData) => {
    await axios.post('https://baz-api.onrender.com/api/v1/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
);

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, data }: { id: string; data: FormData }) => {
    await axios.patch(
      `https://baz-api.onrender.com/api/v1/products/${id}`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }
);

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id: string) => {
    await axios.delete(`https://baz-api.onrender.com/api/v1/products/${id}`);
  }
);

const initialState = {
  loading: true,
  openModal: false,
  showSidebar: false,
  modalTitle: '',
  modalRef: '',
  showDelBtn: false,
  fetch_order_stat_error: '',
  fetch_visitor_stat_error: '',
  fetch_recent_order_error: '',
  fetch_best_seller_error: '',
  product_error: '',
  period: 'monthly',
  totalRevenue: 0,
  previousTotalRevenue: 0,
  totalOrder: 0,
  previousTotalOrder: 0,
  visitor: 0,
  previousVisitor: 0,
  totalSale: 0,
  previousTotalSales: 0,
  percentageRevenue: 0,
  percentageOrder: 0,
  percentageVisitor: 0,
  percentageSales: 0,
  orders: [],
  recentOrders: [],
  bestSeller: [],
} as AdminState;

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    changeTimeRange: (state, action: { type: string; payload: string }) => {
      state.period = action.payload;
    },
    openAdminModal: (
      state,
      action: { type: string; payload: { id: string; title: string } }
    ) => {
      state.openModal = true;
      state.modalRef = action.payload.id;
      state.modalTitle = action.payload.title;
    },
    closeAdminModal: (state) => {
      state.openModal = false;
      state.modalRef = '';
      state.modalTitle = '';
    },
    toggleDelBtn: (state) => {
      state.showDelBtn = !state.showDelBtn;
    },
    openAdminSidebar: (state) => {
      state.showSidebar = true;
    },
    closeAdminSidebar: (state) => {
      state.showSidebar = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch_order_stat_error = '';
        state.totalRevenue = action.payload[1].current;
        state.percentageRevenue = action.payload[1].percentageDifference;
        state.totalSale = action.payload[0].current;
        state.percentageSales = action.payload[0].percentageDifference;
        state.totalOrder = action.payload[2].current;
        state.percentageOrder = action.payload[2].percentageDifference;
        state.previousTotalRevenue = action.payload[1].previous;
        state.previousTotalSales = action.payload[0].previous;
        state.previousTotalOrder = action.payload[2].previous;
      })
      .addCase(fetchOrderStats.rejected, (state, action) => {
        state.loading = false;
        state.fetch_order_stat_error = action.error.message as string;
      });
    builder
      .addCase(fetchVisitorStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisitorStats.fulfilled, (state, action) => {
        state.fetch_visitor_stat_error = '';
        state.loading = false;
        state.visitor = action.payload[0].current;
        state.previousVisitor = action.payload[0].previous;
        state.percentageVisitor = action.payload[0].percentageDifference;
      })
      .addCase(fetchVisitorStats.rejected, (state, action) => {
        state.loading = false;
        state.fetch_visitor_stat_error = action.error.message as string;
      });
    builder
      .addCase(fetchBestSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBestSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch_best_seller_error = '';
        state.bestSeller = action.payload;
      })
      .addCase(fetchBestSeller.rejected, (state, action) => {
        state.loading = false;
        state.fetch_best_seller_error = action.error.message as string;
        state.bestSeller = [];
      });
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch_recent_order_error = '';
        state.orders = action.payload;
        state.recentOrders = action.payload
          .sort(
            (a: OrderType, b: OrderType) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.fetch_recent_order_error = action.error.message as string;
        state.recentOrders = [];
        state.orders = [];
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.product_error = '';
        state.openModal = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.product_error = action.error.message as string;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.product_error = action.error.message as string;
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.product_error = action.error.message as string;
      });
  },
});

export const {
  changeTimeRange,
  openAdminModal,
  closeAdminModal,
  toggleDelBtn,
  openAdminSidebar,
  closeAdminSidebar,
} = adminSlice.actions;
export default adminSlice.reducer;
