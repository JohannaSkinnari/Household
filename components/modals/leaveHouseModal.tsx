import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";
import { selectOwnerOfHousehold } from "../../redux/member/memberSelectors";
import { deleteHouseHoldMember } from "../../redux/member/memberThunk";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

interface Props {
  onClose: () => void;
  onDelete: () => void;
  houseId: string;
}

export default function ConfirmLeaveHouseModal({
  onClose,
  onDelete,
  houseId,
}: Props) {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const house = useAppSelector(h =>
    h.houseHoldList.houseHoldList.find(fh => fh.id === houseId)
  );

  if (!house) {
    throw new Error("Not found");
  }

  const member = useAppSelector(selectOwnerOfHousehold(houseId));

  if (!member) {
    throw new Error("Member not Found");
  }

  const leaveHousehold = () => {
    dispatch(deleteHouseHoldMember(member.id));
    onDelete();
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={`Lämna ${house?.name}`}
        titleStyle={{ textAlign: "center" }}
      />
      <Card.Content
        style={[styles.cardContent, { backgroundColor: colors.background }]}
      >
        <View style={[styles.detalisView, { backgroundColor: colors.surface }]}>
          <View style={styles.warning}>
            <Text style={[styles.boldText, { color: colors.darkPink }]}>
              VARNING!
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              Är du säker på att du vill lämna hushållet?
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <Button
          icon="minus-circle-outline"
          color={colors.darkPink}
          onPress={leaveHousehold}
        >
          Lämna
        </Button>
        <Button
          icon="close-circle-outline"
          color={colors.text}
          onPress={onClose}
        >
          Stäng
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: "50%",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  cardContent: {
    justifyContent: "space-evenly",
    paddingHorizontal: 0,
    marginVertical: 10,
  },
  cardAction: {
    justifyContent: "space-around",
    height: "12%",
    padding: 5,
    marginVertical: 15,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  detalisView: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 8,
    padding: 8,
  },
  warning: {
    alignItems: "center",
  },
});
