import { IHouseHold } from "../../interfaces/IHouseHold";

export interface HouseHoldState {
  houseHoldList: IHouseHold[];
  loading: boolean;
}

export const initialState: HouseHoldState = {
  houseHoldList: [],
  loading: false,
};
