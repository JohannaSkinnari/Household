import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import choreSlice from "./chore/choreSlice";
import houseHoldSlice from "./houseHold/houseHoldSlice";

const rootReducer = combineReducers({
  choresList: choreSlice,
  houseHoldList: houseHoldSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
