import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";
import { completeChore, deleteChore } from "../../redux/chore/choreThunk";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import CustomButton from "../common/CustomButton";

interface Props {
  onArcive: () => void;
  onClose: () => void;
  onDelete: () => void;
  // onRemove?: () => void;
  choreId: string;
  // householdId: string;
}

export default function DeleteChoreModal({
  onArcive,
  onClose,
  onDelete,
  choreId,
  // householdId,
}: Props) {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const chore = useAppSelector(state =>
    state.choresList.chores.find(c => c.id === choreId)
  );
  if (!chore) {
    throw new Error("delete");
  }

  // const ArciveButton = (props: { size: number }) => (
  //   <CustomButton
  //     title="Redigera"
  //     {...props}
  //     icon="pencil-outline"
  //     onPress={onArcive}
  //   />
  // );

  const deleteThisChore = () => {
    dispatch(deleteChore(choreId));
    onDelete();
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={"Ta bort " + chore?.name}
        style={styles.cardTitle}
      />
      <Card.Content
        style={[styles.cardContent, { backgroundColor: colors.background }]}
      >
        <View style={[styles.detalisView, { backgroundColor: colors.surface }]}>
          {/* <Text style={[styles.boldText, { color: colors.text }]}>
            VARNING!
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            Om du tar bort denna syssla kommer statistiken att förändras.
            Vill du istället arkivera sysslan?
          </Text>
          <CustomButton
            title="Redigera"
            icon="pencil-outline"
            onPress={onArcive}
          /> */}
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <Button
          icon="minus-circle-outline"
          color={colors.text}
          onPress={deleteThisChore}
        >
          Ta bort
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
    height: "95%",
    borderRadius: 10,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  cardTitle: {
    height: "12%",
    paddingRight: 5,
  },
  cardContent: {
    height: "76%",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  cardAction: {
    justifyContent: "space-around",
    height: "12%",
    padding: 5,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  detalisView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "90%",
    paddingTop: 8,
    borderRadius: 10,
    padding: 8,
  },
});
