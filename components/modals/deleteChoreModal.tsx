import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";
import { selectChoreById } from "../../redux/chore/choreSelectors";
import { archiveChore, deleteChore } from "../../redux/chore/choreThunk";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

interface Props {
  onArchive: () => void;
  onClose: () => void;
  onDelete: () => void;
  choreId: string;
}

export default function DeleteChoreModal({
  onArchive,
  onClose,
  onDelete,
  choreId,
}: Props) {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const chore = useAppSelector(selectChoreById(choreId));

  if (!chore) {
    throw new Error("delete");
  }

  const deleteThisChore = () => {
    dispatch(deleteChore(choreId));
    onDelete();
  };

  const archiveThisChore = () => {
    dispatch(archiveChore(chore));
    onArchive();
  };

  return (
    <Card style={styles.card}>
      <Card.Title title={`Ta bort , ${chore?.name}`} style={styles.cardTitle} />
      <Card.Content
        style={[styles.cardContent, { backgroundColor: colors.background }]}
      >
        <View style={[styles.detalisView, { backgroundColor: colors.surface }]}>
          <View style={styles.warning}>
            <Text style={[styles.boldText, { color: colors.darkPink }]}>
              VARNING!
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              Om du tar bort denna syssla kommer statistiken att förändras. Vill
              du istället arkivera sysslan?
            </Text>
          </View>
          <Button
            icon="folder-download-outline"
            color={colors.green}
            onPress={archiveThisChore}
          >
            Arkivera
          </Button>
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <Button
          icon="minus-circle-outline"
          color={colors.darkPink}
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
    textAlign: "center",
  },
  detalisView: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "90%",
    paddingTop: 8,
    borderRadius: 10,
    padding: 8,
  },
  warning: {
    alignItems: "center",
  },
});
