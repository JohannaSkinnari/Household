import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { initialState } from "./userState";
import { createNewUser } from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.activeUser = payload;
    },
    removeUser(state, { payload }) {
      state.activeUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(createNewUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(createNewUser.pending, (state, { payload }) => {
      state.loading = true;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
