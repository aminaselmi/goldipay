import * as types from "./actionTypes";
import axios from "axios";

const getMensData = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });

  return axios
    .get(
      `${process.env.REACT_APP_BASE_API}/products?gender=MEN`,
      params
    )
    .then((res) => {
      dispatch({ type: types.GET_MENS_DATA_S, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};

const getWomensData = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });

  return axios
    .get(
      `${process.env.REACT_APP_BASE_API}/products?gender=WOMEN`,
      params
    )
    .then((res) => {
      dispatch({ type: types.GET_WOMENS_DATA_S, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};
const getShoesData = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });
  return axios
    .get(`${process.env.REACT_APP_BASE_API}/products?category=shoes`, params)
    .then((res) => {
      dispatch({ type: types.GET_SHOES_DATA_S, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};

const getHomeData = () => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });

  return axios
    .get(`${process.env.REACT_APP_BASE_API}/Homepage`)
    .then((res) => {
      dispatch({ type: types.GET_HOMEDATA_S, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};

export { getWomensData, getMensData, getShoesData, getHomeData };
