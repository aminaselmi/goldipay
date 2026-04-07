import * as data from "./actionTypes";

const init = {
  products: [],
  isLoading: false,
  isError: false,
};

const dataReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case data.GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case data.GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: payload,
      };

    case data.GET_DATA_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    // ✅ ADD THIS
    case data.SET_LOCAL_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export { dataReducer };