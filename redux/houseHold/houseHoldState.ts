import { IHouseHold } from "../../interfaces/IHouseHold";

export interface HouseHoldState {
  houseHoldList: IHouseHold[];
  loading: boolean;
  error?: string;
  isCreatedSuccess: boolean;
}

export const initialState: HouseHoldState = {
  houseHoldList: [
    {
      id: "1",
      name: "Gökboet",
      houseHoldCode: 12345,
    },
    {
      id: "2",
      name: "DollarStore",
      houseHoldCode: 78902,
    },
    {
      id: "3",
      name: "Bäverly Hills",
      houseHoldCode: 56555,
    },
    {
      id: "4",
      name: "Mount Doom",
      houseHoldCode: 11111,
    },
  ],
  loading: false,
  isCreatedSuccess: true,
};
