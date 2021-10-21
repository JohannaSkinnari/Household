import { Button, Card, Paragraph, Title, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useStore } from "react-redux";
import { color } from "react-native-reanimated";
import WeightPicker from "../WeightPicker";
import CustomButton from "../common/CustomButton";
import { IChore, ICreateChore } from "../../interfaces/IChore";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { createChore } from "../../redux/chore/choreThunk";
import IntervalPicker from "../IntervalPicker";
// import { addChore } from "../../redux/chore/choreSlice";

type ChoreValidationSchema = Record<
  keyof Omit<ICreateChore, "lastCompleted" | "householdId" | "interval" | "weight">,
  yup.AnySchema
>;


const choreValidation = yup.object().shape<ChoreValidationSchema>({
  name: yup
    .string()
    .required("Du behöver ett namn"),
  description: yup.string().required("Du behöver en text"),
  // interval: yup.number().required("Du behöver en text"),
  // weight: yup.number().required("Du behöver en text"),
});

interface Props {
  onSave: () => void;
  onClose: () => void;
}

export default function AdminChoreModal({ onSave, onClose }: Props) {
  const household = {id: "1"}
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const chores = useAppSelector((state) => state.choresList.chores);
  // const [name, setName] = useState("");
  // const [discription, setDiscription] = useState("");
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
      console.log(chores);
      
      
    }
  }

  const selectWeightValue = (weightValue: number) => {
    setWeight(weightValue);
    console.log(weightValue); //glöm inte ta bort
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
            // clearTextOnFocus={true}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput, {backgroundColor: colors.surface, color: colors.onSurface}]}
            multiline={true}
            placeholder="Beskrivning"
            placeholderTextColor={colors.placeholder}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
            textAlignVertical={"top"}
            // clearTextOnFocus={true}
          />
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
              setShowInterval(false);
              setInterval(value)
            }} />
          // <View
          //   style={[styles.input, styles.interval, {backgroundColor: colors.surface}]}
          // >
          //   <Pressable onPress={() => setShowInterval(false)}>
          //     <Text style={[styles.boldText, {color: colors.onSurface}]}>
          //       Gå tillbaka 1 2 3 4 5 6
          //     </Text>
          //   </Pressable>
          // </View>
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
            // selectValue={selectValue}
            value={values.weight}
            selectPickerWeightValue={(value) => {
              setFieldValue("weight", value),
              setShowValue(false);
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
    // zIndex: 3000,
    // flex: 1,
    height: "95%",
    // minHeight: 450,
    // width: "95%",
    borderRadius: 10,
    justifyContent: "space-between",
    // margin: 5,
    marginHorizontal: 10,
    // marginTop: -30,
    // marginBottom: 17
  },
  cardTitle: {
    height: "12%",
    // height: 66,
  },
  cardContent: {
    height: "76%",
    justifyContent: "space-evenly",
    // height: 381,
    // backgroundColor: "red",
    // paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardAction: {
    justifyContent: "space-around",
    height: "12%",
    // height: 66,
    padding: 5,
    // borderRadius: 20,
  },
  input: {
    width: "100%",
    // marginTop: 15,
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
    // fontWeight: "bold",
    fontSize: 18,
  },
  subText: {
    fontSize: 12,
  },
  // valueContainer: {
  //   borderLeftWidth: 0.5, 
  //   flexDirection: "row", 
  //   justifyContent: "space-evenly", 
  //   width: "100%", 
  //   // borderRightColor: "red", 
  //   borderRightWidth: 0.5,
  //   padding: 0,
  //   height: "100%"
  // },
  // valueInnerContainer: {
  //   borderRightWidth: 0.5, 
  //   justifyContent: "center", 
  //   alignItems: "center",
  // },
  // valueLastInnerContainer: {
  //   justifyContent: "center", 
  //   alignItems: "center",
  // },
  // valueCircle: {
  //   borderRadius: 50, 
  //   width: 48, 
  //   height: 48, 
  //   // backgroundColor: colors.disabled, 
  //   justifyContent: "center", 
  //   alignItems: "center",
  // },
  // marginRight5: {
  //   marginRight: 5,
  // },
  litleCircle: {
    borderRadius: 50, 
    width: 25, 
    height: 25, 
    // backgroundColor: colors.disabled, 
    justifyContent: "center", 
    alignItems: "center",
    marginHorizontal: 8,
  },
})