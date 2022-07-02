import axios from "axios";
import {
  ADD_USER_DETAIL,
  REMOVE_USER_INFO,
  RESET_STATE,
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Constants/UserConstants";

export const userRegister =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const body = {
        firstName,
        lastName,
        email,
        password,
      };
      const result = await axios.post(`${process.env.API_HOST}/auth/register`, body);
      const { msg } = result.data;
      dispatch({ type: USER_REGISTER_SUCCESS, payload: msg });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.response ? error.response.data.msg : error.message });
    }
  };

export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const body = {
        email,
        password,
      };
      const result = await axios.post(`${process.env.API_HOST}/auth/login`, body);

      dispatch({ type: USER_INFO_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: USER_INFO_FAIL, payload: error.response ? error.response.data.msg : error.message });
    }
  };

export const userLogout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });

    const { token } = getState().persist.user.userInfo;
    const result = await axios.post(`${process.env.API_HOST}/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });

    dispatch({ type: USER_LOGOUT_SUCCESS, payload: result.data.message });
    dispatch({ type: REMOVE_USER_INFO, payload: null });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const userDetail = () => async (dispatch, getState) => {
  try {
    const { id, token } = getState().persist.user.userInfo;
    const result = await axios.get(`${process.env.API_HOST}/user/profile/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    const { data } = result.data;
    dispatch({ type: ADD_USER_DETAIL, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE, payload: null });
};
