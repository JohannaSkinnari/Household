import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadData } from "../auth/authThunk";
import { initialState } from "./choreState";
import {
  archiveChore,
  completeChore,
  createChore,
  deleteChore,
  editChore,
  getChores,
} from "./choreThunk";

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {
    removeChoreState(state, action: PayloadAction<[]>) {
      state.chores = action.payload;
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

    builder.addCase(archiveChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      const index = state.chores.findIndex(chore => chore.id === payload.id);
      state.chores[index] = {
        ...state.chores[index],
        ...payload,
      };
    });
    builder.addCase(archiveChore.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(archiveChore.pending, state => {
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

    builder.addCase(deleteChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      state.chores = state.chores.filter(chore => chore.id !== payload);
    });
    builder.addCase(deleteChore.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(deleteChore.pending, state => {
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
    builder.addCase(loadData.fulfilled, (state, { payload }) => {
      state.chores = payload.chores;
    });
  },
});

export const { removeChoreState } = choreSlice.actions;

export default choreSlice.reducer;
