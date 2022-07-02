import { ADD_TRANSACTION, REMOVE_TRANSACTION } from "reduxStore/Constants/transConstants";

export const addTransaction = (receiver, transAmount, notes) => (dispatch) => {
  const data = {
    receiver,
    transAmount,
    notes,
  };
  dispatch({ type: ADD_TRANSACTION, payload: data });
};
export const removetransaction = () => (dispatch) => {
  dispatch({ type: REMOVE_TRANSACTION, payload: null });
};
