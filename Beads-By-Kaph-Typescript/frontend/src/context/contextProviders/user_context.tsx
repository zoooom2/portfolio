import {
  createContext,
  useEffect,
  useReducer,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import axios, { AxiosError } from 'axios';
import { ChildrenProps, OrderType, UserType } from '../../types';
import reducer from '../../reducers/user_reducer';
import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  AUTHENTICATE_USER,
  REMOVE_AUTHENTICATION,
  GET_USER_ORDER_BEGIN,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_ERROR,
  SET_IMAGE,
  REMOVE_IMAGE,
} from '../../actions';
import {
  defaultValue,
  initialState,
  UserContextValue,
} from '../defaultContextValue/userDefault';

export const UserContext = createContext<UserContextValue>(defaultValue);

export const UserProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProfile = useCallback(async () => {
    if (!state.isAuthenticated) {
      try {
        dispatch({ type: GET_USER_BEGIN });
        const response = await axios.get('/api/v1/users/me');
        dispatch({ type: GET_USER_SUCCESS, payload: response.data.data });
      } catch (err) {
        dispatch({ type: GET_USER_ERROR });
      }
    }
  }, [state.isAuthenticated]);

  const fetchUserOrder = useCallback(async () => {
    if (state.isAuthenticated) {
      try {
        dispatch({ type: GET_USER_ORDER_BEGIN });
        const response = await axios.get('/api/v1/order/myorders');
        dispatch({
          type: GET_USER_ORDER_SUCCESS,
          payload: response.data.data,
        });
      } catch (err) {
        dispatch({ type: GET_USER_ORDER_ERROR });
      }
    }
  }, [state.isAuthenticated]);

  const authenticateUser = useCallback(() => {
    dispatch({ type: AUTHENTICATE_USER });
  }, []);

  const removeAuthentication = useCallback(() => {
    dispatch({ type: REMOVE_AUTHENTICATION });
  }, []);

  const logOut = useCallback(async () => {
    try {
      await axios.get('/api/v1/users/logout');
      removeAuthentication();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError.response?.data);
      }
    }
  }, [removeAuthentication]);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileData = e.target.files[0];
      dispatch({ type: SET_IMAGE, payload: fileData });
    }
  };
  const removeImage = useCallback(() => {
    dispatch({ type: REMOVE_IMAGE });
  }, []);
  const jwtAuth = useCallback(
    async (email: string, password: string) => {
      try {
        await axios.post(
          '/api/v1/users/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        authenticateUser();
      } catch (error) {
        console.log(error);
      }
    },
    [authenticateUser]
  );

  const googleAuth = () => {
    window.open(`http://localhost:2705/api/v1/auth/google/`, '_self');
  };

  useEffect(() => {
    fetchUserOrder();
    fetchProfile();
  }, [fetchProfile, fetchUserOrder, state.isAuthenticated]);

  const value = useMemo(
    () => ({
      ...state,
      authenticateUser,
      handleImage,
      removeImage,
      removeAuthentication,
      logOut,
      jwtAuth,
      googleAuth,
    }),
    [
      authenticateUser,
      jwtAuth,
      logOut,
      removeAuthentication,
      removeImage,
      state,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
// make sure use
