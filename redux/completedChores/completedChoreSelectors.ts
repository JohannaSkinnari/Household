import { selectAllMembers } from "../member/memberSelectors";
import { RootState } from "../reduxStore";

interface MembersData {
  memberId: string;
  totalWeight: number;
  avatar: number | undefined;
}

interface ChoresData {
  choreId: string;
  membersData: MembersData[];
}

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

export const selectCompletedChoresByHouseholdId =
  (householdId: string) => (state: RootState) =>
    state.completedChoresList.completedChores.filter(
      c => c.householdId === householdId
    );

// export const selectTotalMembersDataByPeriod = (householdId: string, period: string) => (state: RootState) {
//   const totalMembersData = selectTotalMembersData(householdId)(state);
//   const filteredData = totalMembersData.filter(Boolean);
//   return filteredData;
// }

export const selectTotalMembersData =
  (householdId: string) => (state: RootState) => {
    const allMembers = selectAllMembers(state);
    const completedChores =
      selectCompletedChoresByHouseholdId(householdId)(state);

    const totalMembersData: MembersData[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const completedChore of completedChores) {
      const member = totalMembersData.find(
        m => m.memberId === completedChore.memberId // memberId
      );
      const avatar = allMembers.find(aM => aM.id === member?.memberId);
      if (!member) {
        totalMembersData.push({
          memberId: completedChore.memberId,
          totalWeight: completedChore.weight,
          avatar: avatar?.avatarId,
        });
      } else {
        member.totalWeight += completedChore.weight;
      }
    }

    return totalMembersData;
  };

export const selectChoresMembersData =
  (householdId: string) => (state: RootState) => {
    const allMembers = selectAllMembers(state);

    const completedChores =
      selectCompletedChoresByHouseholdId(householdId)(state);

    const choresMembersData: ChoresData[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const completedChore of completedChores) {
      const chore = choresMembersData.find(
        tcd => tcd.choreId === completedChore.choreId
      );
      const avatar = allMembers.find(aM =>
        chore?.membersData.find(md => md.memberId === aM.userId)
      );
      if (!chore) {
        // Om sysslan inte finns så skapar vi ett nytt objekt med medlemmslistan initierad
        choresMembersData.push({
          choreId: completedChore.choreId,
          membersData: [
            {
              memberId: completedChore.memberId,
              totalWeight: completedChore.weight,
              avatar: avatar?.avatarId,
            },
          ],
        });
      } else {
        // Om sysslan finns så kollar vi vidare om medlemmen finns.
        // eslint-disable-next-line no-restricted-syntax
        const choreMember = chore.membersData.find(
          tcd => tcd.memberId === completedChore.memberId
        );
        if (!choreMember) {
          // Om medlemmen inte finns så läggs den till i listan
          chore.membersData.push({
            memberId: completedChore.memberId,
            totalWeight: completedChore.weight,
            avatar: avatar?.avatarId,
          });
        } else {
          // Om medlemmen finns så ökas endast denns totala vikt
          choreMember.totalWeight += completedChore.weight;
        }
      }
    }
    return choresMembersData;
  };
