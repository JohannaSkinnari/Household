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
import { selectChoreById } from "../../redux/chore/choreSelectors";
import { createChore, editChore } from "../../redux/chore/choreThunk";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import CustomButton from "../common/CustomButton";
import IntervalPicker from "../IntervalPicker";
import WeightPicker from "../WeightPicker";

type ChoreValidationSchema = Record<
  keyof Omit<
    IModefideChore,
    "lastCompleted" | "householdId" | "interval" | "weight" | "isArchived"
  >,
  yup.AnySchema
>;

const choreValidation = yup.object().shape<ChoreValidationSchema>({
  name: yup
    .string()
    .required("Du behöver ett namn")
    .max(16, "Namnet är för långt")
    .min(3, "Namnet är för kort"),
  description: yup
    .string()
    .required("Du behöver en text")
    .max(250, "Beskrivningen är för lång"),
});

interface Props {
  onSave: () => void;
  onClose: () => void;
  onRemove: () => void;
  choreId?: string;
  householdId: string;
}

export default function AdminChoreModal({
  onSave,
  onClose,
  onRemove,
  choreId,
  householdId,
}: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [showInterval, setShowInterval] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [weight, setWeight] = useState(1);
  const [interval, setInterval] = useState(7);
  const [colorValue, setColorValue] = useState(colors.valueOne);
  const [choreExist, setChoreExist] = useState(false);
  const [title, setTitle] = useState("Skapa en ny syssla");

  const chore = useAppSelector(selectChoreById(choreId));
  let defaultFormData: IChore;

  if (choreId && chore) {
    defaultFormData = {
      id: chore.id,
      name: chore.name,
      householdId: chore.householdId,
      description: chore.description,
      interval: chore.interval,
      weight: chore.weight,
      isArchived: false,
    };
    useEffect(() => {
      if (chore) {
        selectWeightValue(chore.weight);
        setInterval(chore.interval);
        setChoreExist(true);
        setTitle("Ändra syssla");
      }
    }, []);
  } else {
    defaultFormData = {
      id: "",
      name: "",
      householdId,
      description: "",
      interval: 7,
      weight: 1,
      isArchived: false,
    };
  }

  const selectWeightValue = (weightValue: number) => {
    setWeight(weightValue);
    switch (weightValue) {
      case 1:
        setColorValue(colors.valueOne);
        break;
      case 2:
        setColorValue(colors.valueTwo);
        break;
      case 4:
        setColorValue(colors.valueFour);
        break;
      case 6:
        setColorValue(colors.valueSix);
        break;
      case 8:
        setColorValue(colors.valueEight);
        break;
      default:
        setColorValue(colors.valueOne);
        break;
    }
    setShowValue(false);
  };

  const removeButton = (props: { size: number }) => (
    <CustomButton
      title="Ta bort"
      {...props}
      icon="minus-circle-outline"
      onPress={onRemove}
    />
  );

  async function handleOnSubmit(values: IChore) {
    let response;
    if (!choreId) {
      response = await dispatch(createChore(values));
    } else {
      response = await dispatch(editChore(values));
    }
    if (response) {
      onSave();
    }
  }

  return (
    <Formik
      initialValues={defaultFormData}
      validationSchema={choreValidation}
      onSubmit={handleOnSubmit}
    >
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Card style={styles.card}>
              <Card.Title
                title={title}
                style={styles.cardTitle}
                right={choreExist ? removeButton : undefined}
              />
              <Card.Content
                style={[
                  styles.cardContent,
                  { backgroundColor: colors.background },
                ]}
              >
                <TextInput
                  style={[
                    styles.input,
                    styles.textInput,
                    {
                      backgroundColor: colors.surface,
                      color: colors.onSurface,
                    },
                  ]}
                  placeholder="Titel"
                  placeholderTextColor={colors.placeholder}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={[styles.errors, { color: colors.darkPink }]}>
                    {errors.name}
                  </Text>
                )}
                <TextInput
                  style={[
                    styles.input,
                    styles.descriptionInput,
                    {
                      backgroundColor: colors.surface,
                      color: colors.onSurface,
                    },
                  ]}
                  multiline
                  placeholder="Beskrivning"
                  placeholderTextColor={colors.placeholder}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  textAlignVertical="top"
                />
                {errors.description && touched.description && (
                  <Text style={[styles.errors, { color: colors.darkPink }]}>
                    {errors.description}
                  </Text>
                )}
                {!showInterval ? (
                  <Pressable
                    style={[
                      styles.input,
                      styles.interval,
                      { backgroundColor: colors.surface },
                    ]}
                    onPress={() => setShowInterval(true)}
                  >
                    <Text
                      style={[styles.boldText, { color: colors.onSurface }]}
                    >
                      Återkommande:
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={[styles.normalText, { color: colors.onSurface }]}
                      >
                        var
                      </Text>
                      <View
                        style={[
                          styles.litleCircle,
                          { backgroundColor: colors.darkPink },
                        ]}
                      >
                        <Text style={{ color: colors.background }}>
                          {interval}
                        </Text>
                      </View>
                      <Text
                        style={[styles.normalText, { color: colors.onSurface }]}
                      >
                        dag
                      </Text>
                    </View>
                  </Pressable>
                ) : (
                  <IntervalPicker
                    selectPickerIntervalValue={value => {
                      setFieldValue("interval", value);
                      setShowInterval(false);
                      setInterval(value);
                    }}
                  />
                )}
                {!showValue ? (
                  <Pressable
                    style={[
                      styles.input,
                      styles.value,
                      { backgroundColor: colors.surface },
                    ]}
                    onPress={() => setShowValue(true)}
                  >
                    <View>
                      <Text
                        style={[styles.boldText, { color: colors.onSurface }]}
                      >
                        Värde:
                      </Text>
                      <Text
                        style={[styles.subText, { color: colors.disabled }]}
                      >
                        Hur energikrävande är sysslan?
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.litleCircle,
                        { backgroundColor: colorValue },
                      ]}
                    >
                      <Text
                        style={[styles.subText, { color: colors.onSurface }]}
                      >
                        {weight}
                      </Text>
                    </View>
                  </Pressable>
                ) : (
                  <WeightPicker
                    selectPickerWeightValue={value => {
                      setFieldValue("weight", value);
                      setShowValue(false);
                      selectWeightValue(value);
                    }}
                  />
                )}
              </Card.Content>
              <Card.Actions style={styles.cardAction}>
                <Button
                  icon="plus-circle-outline"
                  color={colors.text}
                  onPress={handleSubmit}
                >
                  Spara
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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
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
  normalText: {
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
});
