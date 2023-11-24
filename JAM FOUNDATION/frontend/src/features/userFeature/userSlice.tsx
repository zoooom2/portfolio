// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// // import { OrderType, UserStateType, UserType } from '../../types';

// export const fetchProfile = createAsyncThunk('user/fetchProfile', async () => {
//   const response = await axios.get(
//     'https://baz-api.onrender.com/api/v1/users/me'
//   );
//   return response.data.data;
// });

// export const logOut = createAsyncThunk('user/logOut', async () => {
//   const response = await axios.get(
//     'https://baz-api.onrender.com/api/v1/users/logout'
//   );
//   return response.data.status;
// });

// export const jwtAuth = createAsyncThunk(
//   'user/jwtAuth',
//   async ([email, password]: string[]) => {
//     const response = await axios.post(
//       'https://baz-api.onrender.com/api/v1/users/login',
//       {
//         email,
//         password,
//       },
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data.data.user;
//   }
// );

// export const signup = createAsyncThunk(
//   'user/signup',
//   async (data: FieldValues) => {
//     const response = await axios.post(
//       'https://baz-api.onrender.com/api/v1/users/signup',
//       data
//     );
//     return response.data.data.user;
//   }
// );

// const initialState = {
//   loading: true,
//   isAuthenticated: false,
//   authentication_error: '',
//   remove_auth_error: '',

//   fetch_user_error: '',
//   orders: [],
//   fetch_order_error: '',

//   user: {
//     id: '',
//     firstname: '',
//     lastname: '',
//     username: '',
//     email: '',
//     photo: '',
//     role: '',
//   },
//   imageFile: {
//     file: undefined,
//     filePreview: undefined,
//   },
// } as UserStateType;

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     authenticateUser: (state, action: { type: string; payload: UserType }) => {
//       state = {
//         ...state,
//         isAuthenticated: true,
//         user: { ...action.payload },
//         loading: false,
//         authentication_error: '',
//       };
//     },

//     removeAuthentication: (state) => {
//       state.isAuthenticated = false;
//       state.user = { ...initialState.user };
//       state.orders = [];
//       state.loading = false;
//     },

//     handleImage: (state, action: { payload: File }) => {
//       state.imageFile = {
//         file: action.payload,
//         filePreview: URL.createObjectURL(action.payload),
//       };
//     },
//     stopLoading: (state) => {
//       state.loading = false;
//     },
//     removeImage: (state) => {
//       state.imageFile = { ...initialState.imageFile };
//     },

//     setClicked: (state, action: { payload: boolean }) => {
//       state.clicked = action.payload;
//     },
//     googleAuth: () => {
//       window.open(`https://baz-api.onrender.com/api/v1/auth/google/`, '_self');
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchProfile.pending, (state) => {
//       state.loading = true;
//       state.fetch_user_error = '';
//     });
//     builder.addCase(
//       fetchProfile.fulfilled,
//       (state, action: { payload: UserType }) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = { ...action.payload };
//       }
//     );
//     builder.addCase(fetchProfile.rejected, (state, action) => {
//       state.fetch_user_error = action.error.message as string;
//       state.loading = false;
//     });

//     builder.addCase(logOut.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(logOut.fulfilled, (state) => {
//       state.isAuthenticated = false;
//       state.user = { ...initialState.user };
//       state.orders = [];
//       state.remove_auth_error = '';
//       state.loading = false;
//     });
//     builder.addCase(logOut.rejected, (state, action) => {
//       state.loading = false;
//       state.remove_auth_error = action.error.message as string;
//     });
//     builder.addCase(jwtAuth.pending, (state) => {
//       state.loading = false;
//       state.authentication_error = '';
//     });
//     builder.addCase(
//       jwtAuth.fulfilled,
//       (state, action: { payload: UserType }) => {
//         state.isAuthenticated = true;

//         state.user = { ...action.payload };
//         state.loading = false;
//         state.authentication_error = '';
//       }
//     );
//     builder.addCase(jwtAuth.rejected, (state, action) => {
//       state.loading = false;
//       state.authentication_error = action.error.message as string;
//     });
//     builder
//       .addCase(signup.pending, (state) => {
//         state.loading = true;
//         state.authentication_error = '';
//       })
//       .addCase(signup.fulfilled, (state, action: { payload: UserType }) => {
//         state.isAuthenticated = true;
//         state.user = { ...action.payload };
//         state.loading = false;
//         state.authentication_error = '';
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.loading = false;
//         state.authentication_error = action.error.message as string;
//       });
//   },
// });

// export const {
//   authenticateUser,
//   removeAuthentication,
//   handleImage,
//   removeImage,
//   setClicked,
//   googleAuth,
//   stopLoading,
// } = userSlice.actions;
// export default userSlice.reducer;
