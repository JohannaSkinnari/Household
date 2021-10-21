import { IChore } from "../../interfaces/IChore";

export interface ChoresState {
  chores: IChore[];
  loading: boolean;
  error: string;
}

export const initialState: ChoresState = {
  chores: [
    {
      id: "1",
      name: "Diska",
      householdId: "1",
      description: "gör tallriken ren",
      interval: 1,
      weight: 2,
    },
    {
      id: "2",
      name: "Diska",
      householdId: "2",
      description: "gör tallriken ren",
      interval: 1,
      weight: 2,
    },
    {
      id: "3",
      name: "Diska",
      householdId: "3",
      description: "gör tallriken ren",
      interval: 1,
      weight: 2,
    },
    {
      id: "4",
      name: "Dammsuga",
      householdId: "1",
      description: "sug upp damm",
      interval: 3,
      weight: 2,
    },
    {
      id: "5",
      name: "Vattna blommor",
      householdId: "2",
      description: "häll vatten på blomman",
      interval: 3,
      weight: 2,
    },
    {
      id: "5",
      name: "plocka upp",
      householdId: "2",
      description: "ställ saker på hyllan om ramlat ner",
      interval: 1,
      weight: 1,
    },
  ],
  loading: false,
  error: "",
};
