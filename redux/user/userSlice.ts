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
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(signupUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(signupUser.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.loading = true;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
