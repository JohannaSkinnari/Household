import { IHouseHold } from "../../interfaces/IHouseHold";

export interface HouseHoldState {
  houseHoldList: IHouseHold[];
  otherHouseholds: IHouseHold[];
  loading: boolean;
  error?: string;
  isCreatedSuccess: boolean;
}

export const initialState: HouseHoldState = {
  houseHoldList: [],
  otherHouseholds: [],
  loading: false,
  isCreatedSuccess: true,
};
