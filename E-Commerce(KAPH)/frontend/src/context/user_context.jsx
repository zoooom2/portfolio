import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import reducer from '../reducers/user_reducer';
import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  AUTHENTICATE_USER,
  REMOVE_AUTHENTICATION,
  GET_USER_ORDER_BEGIN,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_ERROR,
} from '../actions';

const UserContext = React.createContext();
const initialState = {
  loading: true,
  isAuthenticated: false,
  user: {},
  orders: [],
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProfile = async () => {
    if (!state.isAuthenticated) {
      try {
        dispatch({ type: GET_USER_BEGIN });
        const response = await axios.get('/api/v1/users/me');
        dispatch({ type: GET_USER_SUCCESS, payload: response.data.data });
      } catch (err) {
        dispatch({ type: GET_USER_ERROR });
      }
    }
  };

  const fetchUserOrder = async () => {
    if (state.isAuthenticated) {
      try {
        dispatch({ type: GET_USER_ORDER_BEGIN });
        const response = await axios.get('/api/v1/order/myorders');
        dispatch({ type: GET_USER_ORDER_SUCCESS, payload: response.data.data });
      } catch (err) {
        dispatch({ type: GET_USER_ORDER_ERROR });
      }
    }
  };

  const authenticateUser = () => {
    dispatch({ type: AUTHENTICATE_USER });
  };

  const removeAuthentication = () => {
    dispatch({ type: REMOVE_AUTHENTICATION });
  };

  const logOut = async () => {
    try {
      await axios.get('/api/v1/users/logout');
      removeAuthentication();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchUserOrder();
    fetchProfile();
  }, [state.isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ ...state, authenticateUser, removeAuthentication, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
