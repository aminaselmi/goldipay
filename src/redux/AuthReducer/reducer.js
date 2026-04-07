import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";

// ✅ DEFINE initialState
const initialState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  token: null,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: action.payload?.token,
        user: action.payload?.user,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default AuthReducer;
