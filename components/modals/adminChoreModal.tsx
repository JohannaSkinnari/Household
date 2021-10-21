import { Formik } from "formik";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";
import * as yup from "yup";
import { ICreateChore } from "../../interfaces/IChore";
import { createChore } from "../../redux/chore/choreThunk";
import { useAppDispatch } from "../../redux/reduxHooks";
import IntervalPicker from "../IntervalPicker";
import WeightPicker from "../WeightPicker";

type ChoreValidationSchema = Record<
  keyof Omit<ICreateChore, "lastCompleted" | "householdId" | "interval" | "weight">,
  yup.AnySchema
>;

const choreValidation = yup.object().shape<ChoreValidationSchema>({
  name: yup
    .string()
    .required("Du behöver ett namn"),
  description: yup
    .string()
    .required("Du behöver en text"),
});

interface Props {
  onSave: () => void;
  onClose: () => void;
}

export default function AdminChoreModal({ onSave, onClose }: Props) {
  const { colors } = useTheme();
  const household = {id: "1"}
  const dispatch = useAppDispatch();
  const [showInterval, setShowInterval] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [weight, setWeight] = useState(1);
  const [interval, setInterval] = useState(7);
  const [colorValue, setColorValue] = useState(colors.valueOne);

  const defaultFormData: ICreateChore = {
    name: "",
    householdId: household.id,
    description: "",
    interval: 7,
    weight: 1,
  }

  async function handleOnSubmit(values: ICreateChore) {
    const response = await dispatch(createChore(values));
    if (response) {
      onSave();
    }
  }

  const selectWeightValue = (weightValue: number) => {
    setWeight(weightValue);
    switch (weightValue) {
      case 1:
        setColorValue(colors.valueOne)
        break;
      case 2:
        setColorValue(colors.valueTwo)
        break;
      case 4:
        setColorValue(colors.valueFour)
        break;
      case 6:
        setColorValue(colors.valueSix)
        break;
      case 8:
        setColorValue(colors.valueEight)
        break;
      default:
        setColorValue(colors.valueOne)
        break;
    }
    setShowValue(false);
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
        isValid,
      }) => (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Card style={styles.card}>
          <Card.Title title="Skapa en ny syssla" style={styles.cardTitle}/>
          <Card.Content style={[styles.cardContent, {backgroundColor: colors.background}]}>
            <TextInput
              style={[styles.input, styles.textInput, {backgroundColor: colors.surface, color: colors.onSurface}]}
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
              style={[styles.input, styles.descriptionInput, {backgroundColor: colors.surface, color: colors.onSurface}]}
              multiline={true}
              placeholder="Beskrivning"
              placeholderTextColor={colors.placeholder}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              textAlignVertical={"top"}
            />
            {errors.description && touched.description && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.description}
              </Text>
            )}
            {!showInterval ? (<Pressable
              style={[styles.input, styles.interval, {backgroundColor: colors.surface}]}
              onPress={() => setShowInterval(true)}
            >
              <Text style={[styles.boldText, {color: colors.onSurface}]}>
                Återkommande: 
              </Text>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={[styles.normalText, {color: colors.onSurface}]}>
                  var 
                </Text>
                  <View style={[styles.litleCircle, {backgroundColor: colors.darkPink}]}> 
                    <Text style={{color: colors.background}}>
                      {interval}
                    </Text>
                  </View>
                <Text style={[styles.normalText, {color: colors.onSurface}]}>
                  dag
                </Text>
              </View>
            </Pressable>) :
            (
              <IntervalPicker value={values.interval}
              selectPickerIntervalValue={(value) => {
                setFieldValue("interval", value),
                setShowInterval(false),
                setInterval(value)
              }} />
            )}
            {!showValue ? (<Pressable
              style={[styles.input, styles.value, {backgroundColor: colors.surface}]}
              onPress={() => setShowValue(true)}
            >
              <View>
                <Text style={[styles.boldText, {color: colors.onSurface}]}>
                  Värde: 
                </Text>
                <Text style={[styles.subText, {color: colors.disabled}]}>
                  Hur energikrävande är sysslan?
                </Text>
              </View>
              <View style={[styles.litleCircle, {backgroundColor: colorValue}]}>
                <Text style={[styles.subText, {color: colors.onSurface}]}>
                  {weight}
                </Text>
              </View>
            </Pressable>) :
            (<WeightPicker
              value={values.weight}
              selectPickerWeightValue={(value) => {
                setFieldValue("weight", value),
                setShowValue(false),
                selectWeightValue(value)
              }} 
            />)}
          </Card.Content>
          <Card.Actions style={styles.cardAction} >
            <Button icon={"plus-circle-outline"} color={colors.text} onPress={handleSubmit}>Spara</Button>
            <Button icon={"close-circle-outline"} color={colors.text} onPress={onClose}>Stäng</Button>
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
    paddingTop: 8
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
})