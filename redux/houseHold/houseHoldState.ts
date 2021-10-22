import { IHouseHold } from "../../interfaces/IHouseHold";

export interface HouseHoldState {
  houseHoldList: IHouseHold[];
  loading: boolean;
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
  ],
  loading: false,
};
