import { RootState } from "../reduxStore";

export const selectLastCompletedChores =
  (choreId: string) => (state: RootState) => {
    const completedChores = state.completedChoresList.completedChores.filter(
      c => c.choreId === choreId
    );

    const lastThree = completedChores.slice(
      Math.max(completedChores.length - 3, 0)
    );
    return lastThree;
  };
