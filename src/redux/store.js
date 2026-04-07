import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import AuthReducer from "./AuthReducer/reducer";
import { dataReducer } from "./DataReducer/reducer";
import { cartReducer } from "./CartReducer/reducer"; // adjust path
import { pagesReducer } from "./PagesReducer/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  dataReducer,
  cart: cartReducer,   // 👈 THIS IS THE FIX
  pagesReducer,
});

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
  
);

export default store;
