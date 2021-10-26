import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./choreState";
import { completeChore, createChore, editChore, getChores } from "./choreThunk";

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {
    deleteChore(state, action: PayloadAction<string>) {
      state.chores = state.chores.filter(chore => chore.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(createChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      state.chores.push(payload);
    });
    builder.addCase(createChore.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(createChore.pending, state => {
      state.loading = true;
    });

    builder.addCase(editChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      const index = state.chores.findIndex(chore => chore.id === payload.id);
      state.chores[index] = {
        ...state.chores[index],
        ...payload,
      };
    });
    builder.addCase(editChore.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(editChore.pending, state => {
      state.loading = true;
    });

    builder.addCase(completeChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      const index = state.chores.findIndex(chore => chore.id === payload.id);
      state.chores[index] = {
        ...state.chores[index],
        ...payload,
      };
    });
    builder.addCase(completeChore.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(completeChore.pending, state => {
      state.loading = true;
    });

    builder.addCase(getChores.fulfilled, (state, { payload }) => {
      state.chores.push(...payload);
    });
    builder.addCase(getChores.rejected, state => {
      state.error = "No data found";
    });
    builder.addCase(getChores.pending, state => {
      state.loading = true;
    });
  },
});

export const { deleteChore } = choreSlice.actions;

export default choreSlice.reducer;
