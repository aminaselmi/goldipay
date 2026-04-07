import * as types from "./actionTypes";
import axios from "axios";


const getData = (params) => (dispatch) => {
  dispatch({ type: types.GET_DATA_REQUEST });

  return axios
    .get(`${process.env.REACT_APP_BASE_API}/products`, params)
    .then((res) => {
      dispatch({ type: types.GET_DATA_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.GET_DATA_FAILURE });
    });
};

const updateData = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_DATA_REQUEST });
  return axios
    .patch(`${process.env.REACT_APP_BASE_API}/products/${id}`, payload)
    .then((res) => {
      dispatch({ type: types.UPDATE_DATA_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: types.UPDATE_DATA_FAILURE });
    });
};
const deleteData = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_DATA_REQUEST });
  return axios
    .delete(`${process.env.REACT_APP_BASE_API}/products/${id}`)
    .then((res) => {
      dispatch({ type: types.DELETE_DATA_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: types.DELETE_DATA_FAILURE });
    });
};
export { getData, updateData, deleteData };

