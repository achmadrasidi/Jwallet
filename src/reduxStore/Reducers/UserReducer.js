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

export const userRegisterReducer = (state = { isSuccess: false, errorRegister: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, isSuccess: false };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, isSuccess: true };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, isSuccess: false, errorRegister: action.payload };
    case RESET_STATE:
      return { ...state, isSuccess: false, errorRegister: null };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = { isLoggedOut: false, errorLogout: null, logoutMessage: "" }, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { ...state, loading: true, logoutMessage: "", errorLogout: null, isLoggedOut: false };
    case USER_LOGOUT_SUCCESS:
      return { ...state, loading: false, isLoggedOut: true, logoutMessage: action.payload, errorLogout: null };
    case USER_LOGOUT_FAIL:
      return { ...state, loading: false, errorLogout: action.payload, logoutMessage: "", isLoggedOut: false };
    case RESET_STATE:
      return { ...state, isLoggedOut: false, errorLogout: null, logoutMessage: "" };
    default:
      return state;
  }
};

export const userInfoReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, userInfo: {}, loading: true, isSuccess: false, error: null };
    case USER_INFO_SUCCESS:
      const { data } = action.payload.data;
      const { id, token, pin } = data;
      return { ...state, userInfo: { id, token, pin }, loading: false, isSuccess: true, error: null };
    case USER_INFO_FAIL:
      return { ...state, userInfo: {}, loading: false, isSuccess: false, error: action.payload };
    case ADD_USER_DETAIL:
      return { ...state, userDetail: action.payload };
    case REMOVE_USER_INFO:
      return { ...state, userInfo: {}, userDetail: {}, loading: false, isSuccess: false, error: null };
    case RESET_STATE:
      return { ...state, loading: false, isSuccess: false, error: null };
    default:
      return state;
  }
};
