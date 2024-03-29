import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import * as yup from "yup";
import { editHouseHold } from "../redux/houseHold/houseHoldThunk";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import CustomButton from "./common/CustomButton";

type RootValidationSchema = Record<keyof Omit<FormData, "id">, yup.AnySchema>;

const validationSchema = yup.object().shape<RootValidationSchema>({
  name: yup
    .string()
    .required("Namnge ditt hushåll")
    .min(3, "Namnet är för kort")
    .max(18, "Namnet är för långt"),
});

interface Props {
  onSubmitSuccess: () => void;
  houseId: string;
}

type FormData = {
  name: string;
  id: string;
};

export default function EditHouseHoldForm({ onSubmitSuccess, houseId }: Props) {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const activeHouse = useAppSelector(state =>
    state.houseHoldList.houseHoldList.find(h => h.id === houseId)
  );
  if (!activeHouse) return null;

  const defaultFormData: FormData = {
    name: activeHouse.name,
    id: activeHouse.id,
  };
  async function handleOnSubmit(values: FormData) {
    const response = await dispatch(editHouseHold(values));
    if (response) {
      onSubmitSuccess();
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
              placeholder={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              clearTextOnFocus
            />
            {errors.name && touched.name && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.name}
              </Text>
            )}
            <View style={styles.buttonStyle}>
              <CustomButton
                icon="plus-circle-outline"
                title="Spara namn"
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
    marginBottom: 20,
  },
});
