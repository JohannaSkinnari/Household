import { RootState } from "../reduxStore";

export const selectChoreById = (choreId?: string) => (state: RootState) =>
  state.choresList.chores.find(c => c.id === choreId);

export const selectChoresByHouseholdId =
  (householdId: string) => (state: RootState) =>
    state.choresList.chores.filter(
      chore => chore.householdId === householdId && chore.isArchived === false
    );
