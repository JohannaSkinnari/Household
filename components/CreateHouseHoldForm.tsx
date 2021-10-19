import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import * as yup from "yup";
import { IHouseHold } from "../interfaces/IHouseHold";
import React from "react";
import { Formik } from "formik";
import { addHouseHold } from "../redux/houseHold/houseHoldSlice";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

type validationSchema = Record<
  keyof Omit<IHouseHold, "id" | "houseHoldCode">,
  yup.AnySchema
>;

const householdValidation = yup.object().shape<validationSchema>({
  name: yup.string().min(3).max(15).required("namn behövs..."),
});

export default function CreateHouseHoldForm() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    root: {
      flexGrow: 1,
      height: "100%",
      width: "80%",
    },
    errors: {
      fontSize: 14,
      color: colors.darkPink,
      fontWeight: "500",
      paddingHorizontal: 10,
    },
    inputText: {
      backgroundColor: colors.textInput,
      color: colors.onSurface,
      fontSize: 16,
      alignItems: "center",
      borderRadius: 8,
      height: 40,
      width: 200,
      paddingHorizontal: 16,
    },
  });
  //const dispatch = useAppDispatch();
  const defaultFormData: IHouseHold = {
    id: "", //Math.random().toString(),
    name: "",
    houseHoldCode: 0,
  };

  return (
    <Formik
      initialValues={defaultFormData}
      validationSchema={householdValidation}
      onSubmit={(values) => {
        //dispatch(addHouseHold(values));
      }}
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
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="hushållets namn"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            clearTextOnFocus={true}
          />
          {errors.name && touched.name && (
            <Text style={styles.errors}>{errors.name}</Text>
          )}
        </View>
      )}
    </Formik>
  );
}
