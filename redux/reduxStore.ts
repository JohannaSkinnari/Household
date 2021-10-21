import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import choreSlice from "./chore/choreSlice";
import completedChoreSlice from "./completedChores/completedChoreSlice";
import houseHoldSlice from "./houseHold/houseHoldSlice";
import memberSlice from "./member/memberSlice";
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
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
