import {
  GET_USER_BEGIN,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_ORDER_BEGIN,
  GET_USER_ORDER_ERROR,
  GET_USER_ORDER_SUCCESS,
  AUTHENTICATE_USER,
  REMOVE_AUTHENTICATION,
} from '../actions';

const user_reducer = (state, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, isAuthenticated: true };
    case REMOVE_AUTHENTICATION:
      return { ...state, isAuthenticated: false, user: {}, order: [] };
    case GET_USER_BEGIN:
      return { ...state, loading: true };
    case GET_USER_ERROR:
      return { ...state, loading: false };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: { ...action.payload },
      };

    case GET_USER_ORDER_BEGIN:
      return { ...state, loading: true };

    case GET_USER_ORDER_ERROR:
      return { ...state, loading: false };
    case GET_USER_ORDER_SUCCESS:
      return { ...state, loading: false, order: [...action.payload] };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default user_reducer;
