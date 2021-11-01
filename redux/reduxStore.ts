import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import choreSlice from "./chore/choreSlice";
import completedChoreSlice from "./completedChores/completedChoreSlice";
import houseHoldSlice from "./houseHold/houseHoldSlice";
import memberSlice from "./member/memberSlice";
import { themeReducer } from "./theme/themeReducer";
import userSlice from "./user/userSlice";

export interface ThunkApi {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

const rootReducer = combineReducers({
  choresList: choreSlice,
  houseHoldList: houseHoldSlice,
  completedChoresList: completedChoreSlice,
  memberList: memberSlice,
  userList: userSlice,
  DarkMode: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
