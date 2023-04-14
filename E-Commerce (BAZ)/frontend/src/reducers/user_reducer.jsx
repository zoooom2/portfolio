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
  SET_CLICKED,
  START_PROCESS,
  END_PROCESS,
  SET_AUTHENTICATION_ERROR,
  SET_VISITOR_COUNT,
  INCREMENT_VISITOR_COUNT,
} from '../actions';

const user_reducer = (state, action) => {
  switch (action.type) {
    case START_PROCESS:
      return { ...state, loading: true };
    case END_PROCESS:
      return { ...state, loading: false };
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload },
        loading: false,
        authentication_error: false,
      };
    case SET_AUTHENTICATION_ERROR:
      return { ...state, loading: false, authentication_error: true };
    case REMOVE_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        order: [],
        loading: false,
      };

    case GET_USER_ERROR:
      return { ...state, fetch_user_error: true, loading: false };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: { ...action.payload },
      };
    case GET_USER_ORDER_ERROR:
      return { ...state, loading: false };
    case GET_USER_ORDER_SUCCESS:
      return { ...state, loading: false, order: [...action.payload] };
    case SET_IMAGE:
      return {
        ...state,
        imageFile: {
          file: action.payload,
          filePreview: URL.createObjectURL(action.payload),
        },
      };
    case REMOVE_IMAGE:
      return { ...state, imageFile: { file: [], filePreview: null } };
    case SET_CLICKED:
      return { ...state, clicked: action.payload };
    case SET_VISITOR_COUNT:
      return { ...state, visitor_count: action.payload };
    case INCREMENT_VISITOR_COUNT:
      return { ...state, visitor_count: state.visitor_count + 1 };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default user_reducer;
