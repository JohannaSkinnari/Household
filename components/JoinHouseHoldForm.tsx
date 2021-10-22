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
  houseHoldCode: string;
};

interface Props {
  onSubmitSuccess: () => void;
}

export default function CreateHouseHoldForm({ onSubmitSuccess }: Props) {
  const { colors } = useTheme();

  const defaultFormData: FormData = {
    houseHoldCode: "",
  };

  async function handleOnSubmit(values: FormData) {
    onSubmitSuccess();
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
        <View style={[styles.root, { backgroundColor: colors.green }]}>
          <View style={[{ justifyContent: "flex-start" }]}>
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
              value={values.houseHoldCode}
              clearTextOnFocus={true}
            />
            {errors.houseHoldCode && touched.houseHoldCode && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.houseHoldCode}
              </Text>
            )}
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <CustomButton title={"Gå med i Hushåll"} onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "space-between",
  },
  //   container: {
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
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
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
});