import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
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
  SET_IMAGE,
  REMOVE_IMAGE,
  SET_CLICKED,
  START_PROCESS,
  END_PROCESS,
  SET_AUTHENTICATION_ERROR,
  INCREMENT_VISITOR_COUNT,
} from '../actions';

const UserContext = React.createContext();
const initialState = {
  loading: true,
  isAuthenticated: false,
  authentication_error: false,
  clicked: false,
  user: {},
  visitor_count: 0,
  fetch_user_error: false,
  orders: [],
  fetch_order_error: false,
  imageFile: {
    file: [],
    filePreview: null,
  },
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProfile = async () => {
    if (!state.isAuthenticated) {
      try {
        dispatch({ type: START_PROCESS });
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
        dispatch({ type: START_PROCESS });
        const response = await axios.get('/api/v1/order/myorders');
        dispatch({ type: GET_USER_ORDER_SUCCESS, payload: response.data.data });
      } catch (err) {
        dispatch({ type: GET_USER_ORDER_ERROR });
      }
    }
  };

  const checkVisitorCount = async () => {
    if (!Cookies.get('visited')) {
      dispatch({ type: INCREMENT_VISITOR_COUNT });
      await axios.post('/api/v1/visitor');
      Cookies.set('visited', true, { expires: 1 });
    }
  };

  const authenticateUser = () => {
    dispatch({ type: AUTHENTICATE_USER });
  };

  const removeAuthentication = () => {
    dispatch({ type: REMOVE_AUTHENTICATION });
  };

  const logOut = async () => {
    dispatch({ type: START_PROCESS });
    try {
      await axios.get('/api/v1/users/logout');
      dispatch({ type: REMOVE_AUTHENTICATION });
    } catch (error) {
      dispatch({ type: END_PROCESS });
    }
  };

  const handleImage = (e) => {
    const fileData = e.target.files[0];
    dispatch({ type: SET_IMAGE, payload: fileData });
  };

  const removeImage = () => {
    dispatch({ type: REMOVE_IMAGE });
  };

  const jwtAuth = async (email, password) => {
    dispatch({ type: START_PROCESS });
    try {
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
      dispatch({ type: AUTHENTICATE_USER, payload: response.data.data.user });
      return response.data.data;
    } catch (error) {
      dispatch({ type: SET_AUTHENTICATION_ERROR });
    }
  };

  const googleAuth = () => {
    window.open(`http://localhost:2705/api/v1/auth/google/`, '_self');
  };

  const setClicked = (bool) => {
    dispatch({ type: SET_CLICKED, payload: bool });
  };

  useEffect(() => {
    // fetchUserOrder();
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        authenticateUser,
        handleImage,
        removeImage,
        removeAuthentication,
        logOut,
        jwtAuth,
        googleAuth,
        setClicked,
        fetchUserOrder,
        checkVisitorCount,
      }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
