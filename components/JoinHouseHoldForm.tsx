import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import * as yup from "yup";
import CustomButton from "./common/CustomButton";

type RootValidationSchema = Record<keyof FormData, yup.AnySchema>;

const validationSchema = yup.object().shape<RootValidationSchema>({
  houseHoldCode: yup
    .string()
    .min(5, "ingen giltig kod")
    .max(5, "ingen giltig kod")
    .required("ingen giltig kod"),
});

type FormData = {
  houseHoldCode: number;
};

interface Props {
  onSubmitSuccess: (code: number) => void;
}

export default function CreateHouseHoldForm({ onSubmitSuccess }: Props) {
  const { colors } = useTheme();

  const defaultFormData: FormData = {
    houseHoldCode: 0,
  };

  function handleOnSubmit(values: FormData) {
    onSubmitSuccess(values.houseHoldCode);
  }

  return (
    <Formik
      initialValues={defaultFormData}
      validationSchema={validationSchema}
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
        <View>
          <View style={[{ flex: 1 }]}>
            <TextInput
              style={[
                [
                  styles.input,
                  styles.textInput,
                  { backgroundColor: colors.surface, color: colors.onSurface },
                ],
              ]}
              placeholderTextColor={colors.placeholder}
              placeholder={"Ange Hushållskod"}
              onChangeText={handleChange("houseHoldCode")}
              onBlur={handleBlur("houseHoldCode")}
              //value={String(values.houseHoldCode)}
              clearTextOnFocus={true}
            />
            {errors.houseHoldCode && touched.houseHoldCode && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.houseHoldCode}
              </Text>
            )}
          </View>
          <View style={styles.buttonStyle}>
            <CustomButton title={"Gå med i Hushåll"} onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 1,
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
  errors: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  buttonStyle: {
    paddingBottom: 15,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
