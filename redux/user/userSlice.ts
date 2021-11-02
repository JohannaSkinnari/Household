import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { initialState } from "./userState";
import { signupUser, loginUser } from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.activeUser = action.payload;
    },
    removeUser(state, action: PayloadAction<IUser>) {
      state.activeUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signupUser.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(signupUser.rejected, state => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(signupUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, state => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
