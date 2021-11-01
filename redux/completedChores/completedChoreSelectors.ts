import { RootState } from "../reduxStore";

export const selectLastCompletedChores =
  (choreId: string) => (state: RootState) => {
    const completedChores = state.completedChoresList.completedChores.filter(
      c => c.choreId === choreId
    );

    if (!completedChores) {
      return undefined;
    }

    completedChores.sort((a, b) => (b.completed > a.completed ? -1 : 1));

    const lastThree = completedChores.slice(
      Math.max(completedChores.length - 3, 0)
    );

    return lastThree;
  };
