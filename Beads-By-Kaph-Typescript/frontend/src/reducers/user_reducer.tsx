import {
  GET_USER_BEGIN,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  GET_USER_ORDER_BEGIN,
  GET_USER_ORDER_ERROR,
  GET_USER_ORDER_SUCCESS,
  AUTHENTICATE_USER,
  REMOVE_AUTHENTICATION,
  SET_IMAGE,
  REMOVE_IMAGE,
} from '../actions';
import {
  initialState,
  UserContextValue,
} from '../context/defaultContextValue/userDefault';
import {
  OrderType,
  userActionType,
  UserInitialStateType,
  UserType,
} from '../types';

const user_reducer = (
  state: UserInitialStateType,
  action: userActionType
): UserInitialStateType => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, isAuthenticated: true };
    case REMOVE_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: false,
        user: { ...initialState.user },
        orders: [],
      };
    case GET_USER_BEGIN:
      return { ...state, loading: true };
    case GET_USER_ERROR:
      return { ...state, loading: false };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: { ...action.payload } as UserType,
      };

    case GET_USER_ORDER_BEGIN:
      return { ...state, loading: true };

    case GET_USER_ORDER_ERROR:
      return { ...state, loading: false };
    case GET_USER_ORDER_SUCCESS: {
      const payload = action.payload as OrderType[];
      return {
        ...state,
        loading: false,
        orders: [...payload] as OrderType[],
      };
    }
    case SET_IMAGE: {
      const payload = action.payload as File;
      return {
        ...state,
        imageFile: {
          file: action.payload as File,
          filePreview: URL.createObjectURL(payload),
        },
      };
    }
    case REMOVE_IMAGE:
      return {
        ...state,
        imageFile: { file: undefined, filePreview: undefined },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default user_reducer;
