import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminState } from '../../types';
import { initialSingleProduct } from '../../utils/constants';

export const fetchOrderStats = createAsyncThunk(
  'admin/fetchOrderStats',
  async ({
    period,
    start,
    end,
  }: {
    period: string;
    start?: string;
    end?: string;
  }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BAZ_SERVER_URL}/order/pctchange?time=${period}${
        start && end
          ? `&customTimeStart=${encodeURIComponent(
              start
            )}&customTimeEnd=${encodeURIComponent(end)}`
          : ''
      }`,
      { withCredentials: true }
    );

    return response.data.stats;
  }
);
export const fetchVisitorStats = createAsyncThunk(
  'admin/fetchVisitorStats',
  async (period: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BAZ_SERVER_URL}/visitor/pctchange?time=${period}`,
      { withCredentials: true }
    );
    return response.data.stats;
  }
);

export const fetchOrders = createAsyncThunk('admin/fetchOrders', async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BAZ_SERVER_URL}/order`,
    { withCredentials: true }
  );
  return response.data.data;
});

export const fetchSingleOrder = createAsyncThunk(
  'admin/fetchSingleOrder',
  async (id: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BAZ_SERVER_URL}/order/${id}`,
      { withCredentials: true }
    );
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (data: FormData) => {
    await axios.post(`${import.meta.env.VITE_BAZ_SERVER_URL}/products`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
  }
);

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, data }: { id: string; data: FormData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BAZ_SERVER_URL}/products/${id}`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id: string) => {
    await axios.delete(
      `${import.meta.env.VITE_BAZ_SERVER_URL}/products/${id}`,
      { withCredentials: true }
    );
  }
);

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({
    id,
    orderStatus,
  }: {
    id: string;
    orderStatus: 'pending' | 'completed';
  }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_BAZ_SERVER_URL}/order/${id}`,
      {
        orderStatus,
      },
      { withCredentials: true }
    );
    return response.data.data;
  }
);

export const getTopProducts = createAsyncThunk(
  'admin/getTopProducts',
  async ({
    period,
    start,
    end,
  }: {
    period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
    start?: string;
    end?: string;
  }) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BAZ_SERVER_URL
      }/order/bestSellers?period=${period}${
        start && end
          ? `&customTimeStart=${encodeURIComponent(
              start
            )}&customTimeEnd=${encodeURIComponent(end)}`
          : ''
      }`,
      { withCredentials: true }
    );
    return response.data.data;
  }
);
export const getAggregateOrder = createAsyncThunk(
  'admin/aggregateOrder',
  async ({
    period,
    start,
    end,
  }: {
    period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
    start?: string;
    end?: string;
  }) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BAZ_SERVER_URL
      }/order/aggregateOrder?period=${period}${
        start && end
          ? `&customTimeStart=${encodeURIComponent(
              start
            )}&customTimeEnd=${encodeURIComponent(end)}`
          : ''
      }`,
      { withCredentials: true }
    );

    return response.data.data;
  }
);

const initialState = {
  loading: true,
  openModal: false,
  showSidebar: false,
  adminRoute: false,
  sideMenuValue: 'overview',
  modalTitle: '',
  modalRef: '',
  showDelBtn: false,
  fetch_order_error: '',
  fetch_order_stat_error: '',
  fetch_visitor_stat_error: '',
  fetch_single_order_error: '',
  fetch_best_seller_error: '',
  submit_product_error: '',
  aggregateOrder_error: '',
  product_error: '',
  customPeriod: false,
  showCustomCalendar: false,
  period: 'monthly',
  customDateStart: '',
  customDateEnd: '',
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
  singleOrder: {
    _id: '',
    shippingInfo: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      phoneNumber: '',
      postCode: '',
      country: '',
      shippingFee: 0,
      shippingMethod: '',
      countryCode: '',
      state: '',
    },
    additionalInfo: '',
    orderItems: [],
    paymentInfo: { reference: '', gateway: '', channel: '', status: '' },
    createdAt: '',
    paidAt: '',
    taxPrice: 0,
    deliveredAt: 'string',
    total_amount: 0,
    subtotal: 0,
    orderStatus: 'pending',
    total_items: 0,
  },

  aggregateOrder: [],
  bestSeller: [],
  formTempProduct: {
    ...initialSingleProduct,
    collectionName: '',
    category: '',
  },
  formErrorMessage: false,
  isFormValid: true,
  formFieldMode: 'fixed',
  formImages: [],
} as AdminState;

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    changeTimeRange: (
      state,
      action: {
        type: string;
        payload: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
      }
    ) => {
      state.period = action.payload;
    },
    setCustomDate: (state, action) => {
      state.customDateStart = action.payload.start;
      state.customDateEnd = action.payload.end;
    },

    enableCustomPeriod: (state) => {
      state.customPeriod = true;
    },
    disableCustomPeriod: (state) => {
      state.customPeriod = false;
    },
    openCustomCalendar: (state) => {
      state.showCustomCalendar = true;
    },
    closeCustomCalendar: (state) => {
      state.showCustomCalendar = false;
    },
    setAdminRoute: (state, action) => {
      state.adminRoute = action.payload;
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
    changeSideMenuValue: (state, action) => {
      state.sideMenuValue = action.payload;
    },
    openAdminSidebar: (state) => {
      state.showSidebar = true;
    },
    closeAdminSidebar: (state) => {
      state.showSidebar = false;
    },
    resetFormProduct: (state) => {
      state.formTempProduct = { ...initialState.formTempProduct };
    },
    loadFormProduct: (state, action) => {
      state.formTempProduct = action.payload;
    },
    updateFormProduct: (state, action) => {
      const { detail, info } = action.payload;
      state.formTempProduct = { ...state.formTempProduct, [detail]: info };
    },
    setShowErrorMessage: (state, action: { payload: boolean }) => {
      state.formErrorMessage = action.payload;
    },
    setFormValidity: (state, action: { payload: boolean }) => {
      state.isFormValid = action.payload;
    },
    setFieldMode: (state, action: { payload: 'fixed' | 'update' }) => {
      state.formFieldMode = action.payload;
    },
    setFormImages: (state, action) => {
      state.formImages = [...action.payload];
    },
    clearFormImages: (state) => {
      state.formImages = [];
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
      .addCase(getTopProducts.pending, (state) => {
        state.loading = true;
        state.fetch_best_seller_error = '';
        state.bestSeller = [];
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch_best_seller_error = '';
        state.bestSeller = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.fetch_best_seller_error = action.error.message as string;
        state.bestSeller = [];
      });
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.fetch_order_error = '';
        state.orders = [];
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch_order_error = '';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.fetch_order_error = action.error.message as string;
        state.orders = [];
      });
    builder
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
        state.fetch_single_order_error = '';
        state.singleOrder = { ...initialState.singleOrder };
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.fetch_single_order_error = '';
        state.singleOrder = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.fetch_single_order_error = action.error.message as string;
        state.singleOrder = initialState.singleOrder;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.product_error = '';
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
        state.submit_product_error = '';
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.submit_product_error = '';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.submit_product_error = action.error.message as string;
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.submit_product_error = '';
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.submit_product_error = '';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.submit_product_error = action.error.message as string;
      });
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = {
          ...state.singleOrder,
          orderStatus: action.payload.orderStatus,
        };
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.loading = true;
      });
    builder
      .addCase(getAggregateOrder.pending, (state) => {
        state.loading = true;
        state.aggregateOrder_error = '';
      })
      .addCase(getAggregateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.aggregateOrder_error = '';
        state.aggregateOrder = action.payload;
      })
      .addCase(getAggregateOrder.rejected, (state, action) => {
        state.loading = false;
        state.aggregateOrder_error = action.error.message as string;
      });
  },
});

export const {
  changeTimeRange,
  enableCustomPeriod,
  disableCustomPeriod,
  setCustomDate,
  openCustomCalendar,
  closeCustomCalendar,
  openAdminModal,
  closeAdminModal,
  toggleDelBtn,
  changeSideMenuValue,
  openAdminSidebar,
  closeAdminSidebar,
  resetFormProduct,
  updateFormProduct,
  loadFormProduct,
  setShowErrorMessage,
  setFieldMode,
  setFormImages,
  setFormValidity,
  clearFormImages,
  setAdminRoute,
} = adminSlice.actions;
export default adminSlice.reducer;
