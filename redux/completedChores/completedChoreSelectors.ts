import moment from "moment";
import { ICompletedChore } from "../../interfaces/ICompletedChore";
import {
  selectMembersByHouseholdId,
  selectMembersByHouseholdIdAndActiveStatus,
} from "../member/memberSelectors";
import { RootState } from "../reduxStore";

export interface MembersData {
  memberId: string;
  totalWeight: number;
  avatar: number | undefined;
}

export interface ChoresData {
  choreId: string;
  membersData: MembersData[];
}

export const selectLastCompletedChores =
  (choreId: string) => (state: RootState) => {
    const completedChores = state.completedChoresList.completedChores.filter(
      c => c.choreId === choreId
    );

    const today = moment();
    const todaysChores = completedChores.filter(cc =>
      moment(new Date(cc.completed)).isSame(today, "day")
    );

    const trunctatedList = todaysChores.slice(
      Math.max(todaysChores.length - 5, 0)
    );

    return trunctatedList;
  };

export const selectCompletedChoresByHouseholdIdAndActiveMembers =
  (householdId: string) => (state: RootState) => {
    const allMembers =
      selectMembersByHouseholdIdAndActiveStatus(householdId)(state);
    const completedChoresFromHousehold =
      state.completedChoresList.completedChores.filter(
        c => c.householdId === householdId
      );
    const choresFilteredByMembers = completedChoresFromHousehold.map(cc => {
      let filteredCc: ICompletedChore = {
        id: "",
        choreId: "",
        memberId: "",
        householdId: "",
        completed: "",
        weight: 0,
      };

      allMembers.forEach(am => {
        if (am.member.id === cc.memberId) {
          filteredCc = cc;
        }
      });
      return filteredCc;
    });
    return choresFilteredByMembers;
  };

export const selectTotalMembersData =
  (householdId: string, period: string) => (state: RootState) => {
    const allMembers =
      selectMembersByHouseholdIdAndActiveStatus(householdId)(state);

    const completedChores =
      selectCompletedChoresByHouseholdIdAndActiveMembers(householdId)(state);

    const filtredCompletedChores = filterCompletedChoresByPeriod(
      completedChores,
      period
    );

    const totalMembersData: MembersData[] = [];
    for (const completedChore of filtredCompletedChores) {
      const member = totalMembersData.find(
        m => m.memberId === completedChore.memberId
      );

      const avatar = allMembers.find(
        aM => aM.member.id === completedChore.memberId
      )?.avatar?.id;

      if (!member) {
        totalMembersData.push({
          memberId: completedChore.memberId,
          totalWeight: completedChore.weight,
          avatar,
        });
      } else {
        member.totalWeight += completedChore.weight;
      }
    }

    return totalMembersData;
  };

export const selectChoresMembersData =
  (householdId: string, period: string) => (state: RootState) => {
    const allMembers = selectMembersByHouseholdId(householdId)(state);

    const completedChores =
      selectCompletedChoresByHouseholdIdAndActiveMembers(householdId)(state);

    const filtredCompletedChores = filterCompletedChoresByPeriod(
      completedChores,
      period
    );

    const choresMembersData: ChoresData[] = [];
    for (const completedChore of filtredCompletedChores) {
      const chore = choresMembersData.find(
        tcd => tcd.choreId === completedChore.choreId
      );
      const avatar = allMembers.find(
        aM => aM.member.id === completedChore.memberId
      )?.avatar?.id;

      if (!chore) {
        // If chore doesn't exist, create a new object with initiated membersData
        choresMembersData.push({
          choreId: completedChore.choreId,
          membersData: [
            {
              memberId: completedChore.memberId,
              totalWeight: completedChore.weight,
              avatar,
            },
          ],
        });
      } else {
        // If chore exist, check if member exist
        const choreMember = chore.membersData.find(
          tcd => tcd.memberId === completedChore.memberId
        );
        if (!choreMember) {
          // If member doesn't exist add it to array
          chore.membersData.push({
            memberId: completedChore.memberId,
            totalWeight: completedChore.weight,
            avatar,
          });
        } else {
          // If member exist add to members totalWeight
          choreMember.totalWeight += completedChore.weight;
        }
      }
    }
    return choresMembersData;
  };

/* ------- HELPERS BELOW --------*/

export const filterCompletedChoresByPeriod = (
  completedChores: ICompletedChore[],
  period: string
) => {
  switch (period) {
    case "currentWeek": {
      const periodStart = moment().startOf("week");
      const periodEnd = moment().endOf("week");
      return completedChores.filter(cc =>
        moment(new Date(cc.completed)).isBetween(periodStart, periodEnd)
      );
    }
    case "previousWeek": {
      const periodStart = moment().subtract(1, "week").startOf("isoWeek");
      const periodEnd = moment().subtract(1, "week").endOf("isoWeek");
      return completedChores.filter(cc =>
        moment(new Date(cc.completed)).isBetween(periodStart, periodEnd)
      );
    }
    case "currentMonth": {
      const periodStart = moment().startOf("month");
      const periodEnd = moment().endOf("month");
      return completedChores.filter(cc =>
        moment(new Date(cc.completed)).isBetween(periodStart, periodEnd)
      );
    }
    case "previousMonth": {
      const periodStart = moment().subtract(1, "months").startOf("month");
      const periodEnd = moment().subtract(1, "months").endOf("month");
      return completedChores.filter(cc =>
        moment(new Date(cc.completed)).isBetween(periodStart, periodEnd)
      );
    }
    default:
      return completedChores;
  }
};
