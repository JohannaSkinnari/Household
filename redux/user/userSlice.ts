import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./userState";
import { createNewUser } from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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

export const {} = userSlice.actions;

export default userSlice.reducer;
