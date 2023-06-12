import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

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
      Cookies.set('visited', true, { expires: 1 });
      const response = await axios.post('/api/v1/visitor');
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
  async ([email, password]) => {
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

    return response.data.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    isAuthenticated: false,
    authentication_error: '',
    remove_auth_error: '',
    clicked: false,
    user: {},
    visitor_count: 0,
    fetch_user_error: '',
    orders: [],
    fetch_order_error: '',
    visitor_count_error: '',
    imageFile: {
      file: [],
      filePreview: null,
    },
  },
  reducers: {
    authenticateUser: (state, action) => {
      state = {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload },
        loading: false,
        authentication_error: false,
      };
    },

    removeAuthentication: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.order = [];
      state.loading = false;
    },

    handleImage: (state, action) => {
      state.imageFile = {
        file: action.payload,
        filePreview: URL.createObjectURL(action.payload),
      };
    },

    removeImage: (state) => {
      state.imageFile = { file: [], filePreview: null };
    },

    setClicked: (state, action) => {
      state.clicked = action.payload;
    },
    googleAuth: () => {
      window.open(`http://localhost:2705/api/v1/auth/google/`, '_self');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = { ...action.payload };
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      console.log(action);
      state.fetch_user_error = action.error.message;
      state.loading = false;
    });
    builder.addCase(fetchUserOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserOrder.fulfilled, (state, action) => {
      state.fetch_order_error = '';
      state.loading = false;
      state.order = [...action.payload];
    });
    builder.addCase(fetchUserOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(checkVisitorCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkVisitorCount.fulfilled, (state, action) => {
      state.visitor_count_error = '';
      state.visitor_count = action.payload;
    });
    builder.addCase(checkVisitorCount.rejected, (state, action) => {
      state.visitor_count_error = action.error.message;
      state.loading = false;
    });
    builder.addCase(logOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.order = [];
      state.remove_auth_error = '';
      state.loading = false;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.loading = false;
      state.remove_auth_error = action.error.message;
    });
    builder.addCase(jwtAuth.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(jwtAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...action.payload };
      state.loading = false;
      state.authentication_error = '';
    });
    builder.addCase(jwtAuth.rejected, (state, action) => {
      state.loading = false;
      state.authentication_error = action.error.message;
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
} = userSlice.actions;
export default userSlice.reducer;
