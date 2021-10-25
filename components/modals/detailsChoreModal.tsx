import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Card, useTheme } from "react-native-paper";
import * as yup from "yup";
import { IChore, IModefideChore } from "../../interfaces/IChore";
import { createChore, editChore } from "../../redux/chore/choreThunk";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import CustomButton from "../common/CustomButton";
import IntervalPicker from "../IntervalPicker";
import WeightPicker from "../WeightPicker";

interface Props {
  onDone: () => void;
  onClose: () => void;
  onEdit: () => void;
  // onRemove?: () => void;
  choreId: string;
  // householdId: string;
}

export default function DetailsChoreModal({
  onDone,
  onClose,
  onEdit,
  // onRemove,
  choreId,
}: // householdId,
Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [showInterval, setShowInterval] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [weight, setWeight] = useState(1);
  const [interval, setInterval] = useState(7);
  const [colorValue, setColorValue] = useState(colors.valueOne);
  const [isAdmin, setIsAdmin] = useState(true);

  let chore = useAppSelector((state) =>
    state.choresList.chores.find((chore) => chore.id == choreId)
  );

  const editButton = (props: { size: number }) => (
    <CustomButton
      title="Redigera"
      {...props}
      icon="pencil-outline"
      onPress={() => {
        // onEdit;
        onClose;
        // console.log("redigerar");
      }}
    />
  );

  return (
    <Card style={styles.card}>
      <Card.Title
        title={chore?.name}
        style={styles.cardTitle}
        right={isAdmin ? editButton : undefined}
      />
      <Card.Content
        style={[styles.cardContent, { backgroundColor: colors.background }]}
      >
        <View style={[styles.detalisView, { backgroundColor: colors.surface }]}>
          <Text style={[styles.boldText, { color: colors.text }]}>
            Beskrivning:
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {chore?.description}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <Button
          icon={"check-circle-outline"}
          color={colors.text}
          onPress={onDone}
        >
          Markera som gjord
        </Button>
        <Button
          icon={"close-circle-outline"}
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
  container: {
    flex: 1,
  },
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
  input: {
    width: "100%",
    borderBottomWidth: 0,
    fontSize: 18,
    borderRadius: 10,
    paddingHorizontal: 16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  textInput: {
    alignItems: "flex-start",
    height: 55,
  },
  descriptionInput: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 125,
    paddingTop: 8,
  },
  interval: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
  },
  value: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  subText: {
    fontSize: 12,
  },
  litleCircle: {
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  errors: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  detalisView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "90%",
    // paddingTop: 8,
    borderRadius: 10,
    padding: 8,
  },
});
