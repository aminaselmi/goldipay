import * as data from "./actionType";

const init = []; // array of cart items

const cartReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case data.ADD_TO_CART: {
      const isPresent = state.find(
        (item) => item.id === payload.id && item.size === payload.size
      );

      if (isPresent) {
        return state.map((item) =>
          item.id === payload.id && item.size === payload.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...state, { ...payload, qty: 1 }];
      }
    }

    case data.IN_QTY:
      return state.map((item) =>
        item.id === payload.id && item.size === payload.size
          ? { ...item, qty: item.qty + 1 }
          : item
      );

    case data.DEC_QTY:
      return state.map((item) =>
        item.id === payload.id && item.size === payload.size
          ? { ...item, qty: item.qty - 1 }
          : item
      );

    case data.REMOVE_QTY:
      return state.filter(
        (item) => !(item.id === payload.id && item.size === payload.size)
      );

    case data.CLEAR_QTY:
      return [];

    default:
      return state;
  }
};

export { cartReducer };