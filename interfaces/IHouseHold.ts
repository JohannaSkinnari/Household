export interface IHouseHold {
  id: string;
  name: string;
  houseHoldCode: number;
}

export type ICreateHouseHold = Omit<IHouseHold, "id" | "houseHoldCode">;

export type IEditHouseHold = Omit<IHouseHold, "houseHoldCode">;

