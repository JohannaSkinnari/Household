import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useTheme } from "react-native-paper";
import PieChartView from "../../components/PieChartView";
// import { IAvatar } from "../../interfaces/IAvatar";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { completeChore } from "../../redux/chore/choreThunk";
import completedChoreSlice from "../../redux/completedChores/completedChoreSlice";
import { useAppSelector } from "../../redux/reduxHooks";
import { avatars, avatarColors } from "../../assets/AvatarData/data";

export interface MembersData {
  memberId: string;
  totalWeight: number;
  avatar: number | undefined;
}

interface ChoresData {
  choreId: string;
  membersData: MembersData[];
}

export default function CurrentWeekStatisticScreen({
  route,
}: HouseholdStackScreenProps<"veckan">) {
  const { colors } = useTheme();
  const allMembers = useAppSelector(state => state.memberList.members);
  const householdId = route.params.id;
  const avatarColor = avatarColors;

  const data = useAppSelector(state => {
    const completedChores = state.completedChoresList.completedChores.filter(
      c => c.houseHoldId === householdId
    );
    // const memberColor = state.avatarColors.filter(); //sortera ut member.avatarID == avatarID

    const totalMembersData: MembersData[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const completedChore of completedChores) {
      const member = totalMembersData.find(
        m => m.memberId === completedChore.userId // memberId
      );
      const avatar = allMembers.find(aM => aM.id === member?.memberId);
      if (!member) {
        totalMembersData.push({
          memberId: completedChore.userId,
          totalWeight: completedChore.weight,
          avatar: avatar?.avatarId,
        });
      } else {
        member.totalWeight += completedChore.weight;
      }
    }

    const totalChoresData: ChoresData[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const completedChore of completedChores) {
      const memData: MembersData[] = [];
      const chore = totalChoresData.find(
        tcd => tcd.choreId === completedChore.choreId
      );
      const avatar = allMembers.find(aM =>
        chore?.membersData.find(md => md.memberId === aM.userId)
      );
      if (!chore) {
        memData.push({
          memberId: completedChore.userId,
          totalWeight: completedChore.weight,
          avatar: avatar?.avatarId,
        });
        totalChoresData.push({
          choreId: completedChore.choreId,
          membersData: memData,
        });
        console.log("=========MEMDATA===============");

        console.log(memData);
        console.log(
          "==================TotalChoresData==========================="
        );

        console.log(totalChoresData);
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const totalChoreData of totalChoresData) {
          const choreMember = totalChoreData.membersData.find(
            tcd => tcd.memberId === completedChore.userId
          );
          if (!choreMember) {
            console.log("No ChoreMember!");
            console.log(`totalChoreData ID: ${totalChoreData.choreId}`);
            console.log(
              `totalChoreData membersdata: ${totalChoreData.membersData}`
            );
            // totalChoresData.push({
            //   choreId: completedChore.choreId,
            //   membersData: totalChoreData.membersData,
            // });
          } else {
            choreMember.totalWeight += completedChore.weight;
            console.log(choreMember.totalWeight);
          }
        }
        totalChoresData.map(m =>
          // eslint-disable-next-line no-return-assign
          m.membersData.map(md => (md.totalWeight += completedChore.weight))
        );
      }
    }

    // if (!chore) {
    //   totalChoresData.push({
    //     choreId: completedChore.choreId,
    //     membersData: {

    //         totalChoresData.membersData.push({
    //           memberId: completedChore.userId,
    //         totalWeight: completedChore.weight
    //       })

    //     }
    //   })

    // const choresData: { choreId: string; membersData: MembersData[] }[] = [
    //   {
    //     choreId: "1",
    //     membersData: [
    //       { memberId: "1", totalWeight: 2 },

    //       { memberId: "2", totalWeight: 1 },
    //     ],
    //   },
    //   {
    //     choreId: "2",
    //     membersData: [{ memberId: "2", totalWeight: 2 }],
    //   },
    //   {
    //     choreId: "3",
    //     membersData: [
    //       { memberId: "2", totalWeight: 1 },
    //       { memberId: "1", totalWeight: 1 },
    //     ],
    //   },
    // ];
    // eslint-disable-next-line no-restricted-syntax
    // for (const completedChore of completedChores) {
    //   const chore = choresData.find(
    //     cd => cd.choreId === completedChore.choreId
    //   );
    //   // const members: MembersData[] = choresData.find(c => c.membersData);
    //   if (!chore) {
    //     //
    //     // const members: MembersData[] = []
    //     const members = choresData.find(c =>
    //       c.membersData.find(
    //         m => m.memberId === completedChore.userId // memberId
    //       )
    //     );
    //   }
    // }
    // 5 olika sysslor - varje objekt innehåller arrayed med membersdata - som i sin tur har totalWeigth

    const members = completedChores.map(completedChore => {
      const memberCount = completedChores.filter(
        member => member.userId
      ).length;
      // console.log(`memberCount: ${memberCount}`);
      // console.log(`completedChoreId: ${completedChore.id}`);

      return {
        memberId: completedChore.userId,
        totalWeight: memberCount * completedChore.weight,
      };
    });
    // console.log(`members: ${members}`);

    return { totalMembersData, totalChoresData, members };
  });

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <ScrollView
        style={[styles.root, { height: "100%" }]}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <View style={styles.choreTotalPieContainer}>
          <PieChartView
            widthAndHeight={200}
            series={data.totalMembersData.map(md => md.totalWeight)}
            sliceColor={
              [colors.blue, colors.pink]
              // data.totalMembersData.map(
              // aC => aC.memberId === avatarColor.id)
            }
            isTotal
            title="Totalt"
          />
        </View>

        {data.totalMembersData.map(tmd => {
          const activeMemberAvatar = avatars.find(a => a.id === tmd.avatar);
          return (
            <View key={activeMemberAvatar?.id} style={styles.iconsContainer}>
              <Image
                key={activeMemberAvatar?.id}
                source={activeMemberAvatar?.icon}
              />
            </View>
          );
        })}
        <View style={styles.chorePiesContainer}>
          {data.totalChoresData.map(item => (
            <PieChartView
              key={item.choreId}
              widthAndHeight={100}
              series={item.membersData.map(m => m.totalWeight)}
              sliceColor={[colors.blue, colors.green]}
              isTotal={false}
              //   title={item.membersData.map(m => m.totalWeight).toString()}
              title={item.choreId} // chore namn
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    paddingTop: 20,
  },
  choreTotalPieContainer: {
    height: "50%",
    flex: 1,
  },
  chorePiesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    height: "50%",
    marginBottom: 65,
  },
  iconsContainer: {
    marginRight: 8,
    flexDirection: "row",
  },
});
