import { IChore } from "../../interfaces/IChore";

export interface ChoresState {
  chores: IChore[];
  loading: boolean;
  error?: string;
  isCreatedSuccess: boolean;
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
      isArchived: false,
    },
    {
      id: "2",
      name: "Diska",
      householdId: "2",
      description: "gör tallriken ren",
      interval: 1,
      weight: 2,
      isArchived: false,
    },
    {
      id: "3",
      name: "Diska",
      householdId: "3",
      description: "gör tallriken ren",
      interval: 1,
      weight: 2,
      lastCompleted: "2021-10-20T22:00:00.000Z",
      isArchived: false,
    },
    {
      id: "4",
      name: "Dammsuga",
      householdId: "1",
      description: "sug upp damm",
      interval: 3,
      weight: 2,
      isArchived: false,
    },
    {
      id: "5",
      name: "Vattna blommor",
      householdId: "2",
      description: "häll vatten på blomman",
      interval: 3,
      weight: 2,
      isArchived: false,
    },
    {
      id: "6",
      name: "plocka upp",
      householdId: "2",
      description: "ställ saker på hyllan om ramlat ner",
      interval: 1,
      weight: 1,
      isArchived: false,
    },
    {
      id: "7",
      name: "plocka upp",
      householdId: "3",
      description: "ställ saker på hyllan om ramlat ner",
      interval: 1,
      weight: 1,
      isArchived: false,
    },
  ],
  // Ska kommenteras in när hårdkodade värden ersätts med data från databasen
  // chores: [],
  loading: false,
  isCreatedSuccess: true,
};
