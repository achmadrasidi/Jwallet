import { userInfoReducer, userLogoutReducer, userRegisterReducer } from "./Reducers/UserReducer";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { transReducer } from "./Reducers/transReducer";
import { useMemo } from "react";

const persistConfig = {
  key: "root",
  storage,
};

const combineReducer = combineReducers({ user: userInfoReducer, transaction: transReducer });

const persistedReducer = persistReducer(persistConfig, combineReducer);

const middleware = [thunk];

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      persist: persistedReducer,
      userRegist: userRegisterReducer,
      userLogout: userLogoutReducer,
    },
    middleware,
    devTools: true,
    preloadedState,
  });
};
let store;
export const initialiseStore = (preloadedState) => {
  let _store = store ?? createStore(preloadedState);

  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState) => {
  return useMemo(() => initialiseStore(initialState), [initialState]);
};
