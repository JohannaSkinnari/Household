import { Formik } from "formik";
import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { editHouseHold } from "../redux/houseHold/houseHoldThunk";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import CustomButton from "./common/CustomButton";
import { ICreateHouseHold, IHouseHold } from "../interfaces/IHouseHold";


type RootValidationSchema = Record<keyof FormData, yup.AnySchema>;
type HouseValidationSchema = Record<keyof FormData["house"], yup.AnySchema>;


const validationSchema = yup.object().shape<RootValidationSchema>({
  house: yup.object().shape<HouseValidationSchema>({
    name: yup
      .string()
      .required("Namnge ditt hushåll")
      .min(3, "Namnet är för kort")
      .max(18, "Namnet är för långt"),
    })
});
interface Props {
  onSubmitSuccess: () =>void ,
  houseId: string,
}

type FormData = {
  house: Omit<ICreateHouseHold, "id"> ,
};

export default function EditHouseHoldForm({ onSubmitSuccess, houseId
  }: Props) {
  const dispatch=useAppDispatch();
  const { colors } = useTheme();

  const activeHouse = useAppSelector((state) =>
    state.houseHoldList.houseHoldList.find((h) => h.id === houseId)
  );
  if (!activeHouse) throw Error;

  const defaultFormData: FormData = {
    house: activeHouse
  };
  async function handleOnSubmit(values: FormData) {
    const response = await dispatch(editHouseHold(values.house));
    if (response) {
      onSubmitSuccess()
    }
  }
  return (
    <Formik
      initialValues={defaultFormData}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <View style={styles.root}>
          <View style={styles.container}>
            <TextInput
              style={[
                [
                  styles.input,
                  styles.textInput,
                  { backgroundColor: colors.surface, color: colors.onSurface },
                ],
              ]}
              placeholderTextColor={colors.placeholder}
              placeholder={values.house.name}
              onChangeText={handleChange("house.name")}
              onBlur={handleBlur("house.name")}
              value={values.house.name}
              clearTextOnFocus={true}
            />
            {errors.house && touched.house && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.house.name}
              </Text>
            )}
            <View style={styles.buttonStyle}>
              <CustomButton
                icon={"plus-circle-outline"}
                title={"Spara"}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  errors: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  input: {
    marginTop: 15,
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
    width: 330,
  },
  textInput: {
    textAlign: "center",
    height: 55,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});
