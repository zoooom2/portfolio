import React, { useContext, useEffect, useReducer } from 'react';
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
  SET_IMAGE,
  REMOVE_IMAGE,
  SET_CLICKED,
} from '../actions';

const UserContext = React.createContext();
const initialState = {
  loading: true,
  isAuthenticated: false,
  clicked: false,
  user: {},
  orders: [],
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

  const handleImage = (e) => {
    const fileData = e.target.files[0];
    dispatch({ type: SET_IMAGE, payload: fileData });
  };
  const removeImage = () => {
    dispatch({ type: REMOVE_IMAGE });
  };
  const jwtAuth = async (email, password) => {
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
  };

  const googleAuth = () => {
    window.open(`http://localhost:2705/api/v1/auth/google/`, '_self');
  };

  const setClicked = () => {
    dispatch({ type: SET_CLICKED });
  };

  useEffect(() => {
    fetchUserOrder();
    fetchProfile();
  }, [state.isAuthenticated]);

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
      }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
