import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Cookies from 'js-cookie';
import { OrderType, UserStateType, UserType } from '../../types';

export const fetchProfile = createAsyncThunk('user/fetchProfile', async () => {
  const response = await axios.get('/api/v1/users/me');
  return response.data.data;
});

export const fetchUserOrder = createAsyncThunk(
  'user/fetchUserOrder',
  async () => {
    const response = await axios.get('/api/v1/order/myorders');
    return response.data.data;
  }
);

export const checkVisitorCount = createAsyncThunk(
  'user/checkVisitorCount',
  async () => {
    if (!Cookies.get('visited')) {
      Cookies.set('visited', 'true', { expires: 1 });
      const response = await axios.patch('/api/v1/visitor');
      return response.data.doc.count;
    }
  }
);

export const logOut = createAsyncThunk('user/logOut', async () => {
  const response = await axios.get('/api/v1/users/logout');
  return response.data.status;
});

export const jwtAuth = createAsyncThunk(
  'user/jwtAuth',
  async ([email, password]: string[]) => {
    const response = await axios.post(
      '/api/v1/users/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data.data.user;
  }
);

const initialState = {
  loading: true,
  isAuthenticated: false,
  authentication_error: '',
  remove_auth_error: '',
  clicked: false,
  visitor_count: 0,
  fetch_user_error: '',
  orders: [],
  fetch_order_error: '',
  visitor_count_error: '',
  user: {
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    photo: '',
    role: '',
  },
  imageFile: {
    file: undefined,
    filePreview: undefined,
  },
} as UserStateType;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticateUser: (state, action: { type: string; payload: UserType }) => {
      state = {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload },
        loading: false,
        authentication_error: '',
      };
    },

    removeAuthentication: (state) => {
      state.isAuthenticated = false;
      state.user = { ...initialState.user };
      state.orders = [];
      state.loading = false;
    },

    handleImage: (state, action: { payload: File }) => {
      state.imageFile = {
        file: action.payload,
        filePreview: URL.createObjectURL(action.payload),
      };
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    removeImage: (state) => {
      state.imageFile = { ...initialState.imageFile };
    },

    setClicked: (state, action: { payload: boolean }) => {
      state.clicked = action.payload;
    },
    googleAuth: () => {
      window.open(`https://baz-api.onrender.com/api/v1/auth/google/`, '_self');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProfile.fulfilled,
      (state, action: { payload: UserType }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = { ...action.payload };
      }
    );
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.fetch_user_error = action.error.message as string;
      state.loading = false;
    });
    builder.addCase(fetchUserOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserOrder.fulfilled,
      (state, action: { payload: OrderType[] }) => {
        state.fetch_order_error = '';
        state.loading = false;
        state.orders = [...action.payload];
      }
    );
    builder.addCase(fetchUserOrder.rejected, (state, action) => {
      state.loading = false;
      state.fetch_order_error = action.error.message as string;
    });
    builder.addCase(checkVisitorCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      checkVisitorCount.fulfilled,
      (state, action: { payload: number }) => {
        state.visitor_count_error = '';
        state.visitor_count = action.payload;
      }
    );
    builder.addCase(checkVisitorCount.rejected, (state, action) => {
      state.visitor_count_error = action.error.message as string;
      // state.loading = false;
    });
    builder.addCase(logOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = { ...initialState.user };
      state.orders = [];
      state.remove_auth_error = '';
      state.loading = false;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.loading = false;
      state.remove_auth_error = action.error.message as string;
    });
    builder.addCase(jwtAuth.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(
      jwtAuth.fulfilled,
      (state, action: { payload: UserType }) => {
        state.isAuthenticated = true;

        state.user = { ...action.payload };
        state.loading = false;
        state.authentication_error = '';
      }
    );
    builder.addCase(jwtAuth.rejected, (state, action) => {
      state.loading = false;
      state.authentication_error = action.error.message as string;
    });
  },
});

export const {
  authenticateUser,
  removeAuthentication,
  handleImage,
  removeImage,
  setClicked,
  googleAuth,
  stopLoading,
} = userSlice.actions;
export default userSlice.reducer;
