import { ADD_TRANSACTION, REMOVE_TRANSACTION } from "reduxStore/Constants/transConstants";

export const transReducer = (state = { transItem: {} }, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return { ...state, transItem: action.payload };
    case REMOVE_TRANSACTION:
      return { ...state, transItem: {} };
    default:
      return state;
  }
};
