import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./features/user/usersSlice";
import employeeSlice from "./features/employee/employeeSlice";

const persistConfig = {
  key: "root", // Key prefix for persisted state
  storage,
  // whitelist: ["user"],
};
const rootReducer = combineReducers({
  // Combine reducers if needed
  user: userSlice,
  employee: employeeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
