import { userInfoReducer, userLogoutReducer, userRegisterReducer } from "./Reducers/UserReducer";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { transReducer } from "./Reducers/transReducer";

const persistConfig = {
  key: "root",
  storage,
};

const combineReducer = combineReducers({ user: userInfoReducer, transaction: transReducer });

const persistedReducer = persistReducer(persistConfig, combineReducer);

const middleware = [thunk];

export const store = configureStore({
  reducer: {
    persist: persistedReducer,
    userRegist: userRegisterReducer,
    userLogout: userLogoutReducer,
  },
  middleware,
  devTools: true,
});

export const persistor = persistStore(store);
