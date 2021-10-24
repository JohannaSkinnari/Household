import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChore, IModefideChore } from "../../interfaces/IChore";
import { initialState } from "./choreState";
import { createChore, editChore, getChores } from "./choreThunk";

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {
    deleteChore(state, action: PayloadAction<string>) {
      state.chores = state.chores.filter(
        (chore) => chore.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      state.chores.push(payload);
    });
    builder.addCase(createChore.rejected, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(createChore.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(editChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      const index = state.chores.findIndex((chore) => chore.id === payload.id);
      state.chores[index] = {
        ...state.chores[index],
        ...payload,
      };
    });
    builder.addCase(editChore.rejected, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(editChore.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getChores.fulfilled, (state, { payload }) => {
      state.chores.push(...payload);
    });
    builder.addCase(getChores.rejected, (state, { payload }) => {
      state.error = "No data found";
    });
    builder.addCase(getChores.pending, (state, { payload }) => {
      state.loading = true;
    });
  },
});

export const { deleteChore } = choreSlice.actions;

export default choreSlice.reducer;
