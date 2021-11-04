import moment from "moment";
import { ICompletedChore } from "../../interfaces/ICompletedChore";
import { selectMembersByHouseholdId } from "../member/memberSelectors";
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

export const selectCompletedChoresByHouseholdId =
  (householdId: string) => (state: RootState) =>
    state.completedChoresList.completedChores.filter(
      c => c.householdId === householdId
    );

export const selectTotalMembersData =
  (householdId: string, period: string) => (state: RootState) => {
    const allMembers = selectMembersByHouseholdId(householdId)(state);

    const completedChores =
      selectCompletedChoresByHouseholdId(householdId)(state);

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
        aM => aM.member.userId === completedChore.memberId
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
      selectCompletedChoresByHouseholdId(householdId)(state);

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
        aM => aM.member.userId === completedChore.memberId
      )?.avatar?.id;

      if (!chore) {
        // Om sysslan inte finns så skapar vi ett nytt objekt med medlemmslistan initierad
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
        // Om sysslan finns så kollar vi vidare om medlemmen finns.
        const choreMember = chore.membersData.find(
          tcd => tcd.memberId === completedChore.memberId
        );
        if (!choreMember) {
          // Om medlemmen inte finns så läggs den till i listan
          chore.membersData.push({
            memberId: completedChore.memberId,
            totalWeight: completedChore.weight,
            avatar,
          });
        } else {
          // Om medlemmen finns så ökas endast denns totala vikt
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
