import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import * as yup from "yup";
import { ICreateHouseHold } from "../interfaces/IHouseHold";
import { ICreateMember } from "../interfaces/IMember";
import { createHouseHold } from "../redux/houseHold/houseHoldThunk";
import { useAppDispatch } from "../redux/reduxHooks";
import AvatarList from "./AvatarList";
import CustomButton from "./common/CustomButton";

type RootValidationSchema = Record<keyof FormData, yup.AnySchema>;
type HouseValidationSchema = Record<keyof FormData["house"], yup.AnySchema>;
type MemberValidationSchema = Record<
  keyof FormData["member"],
  yup.NumberSchema
>;

const validationSchema = yup.object().shape<RootValidationSchema>({
  house: yup.object().shape<HouseValidationSchema>({
    name: yup
      .string()
      .required("Namnge ditt hushåll")
      .min(3, "Namnet är för kort")
      .max(25, "Namnet är för långt"),
  }),
  member: yup.object().shape<MemberValidationSchema>({
    avatarId: yup.number().min(1, "Välj en avatar"),
  }),
});

type FormData = {
  house: ICreateHouseHold;
  member: Omit<ICreateMember, "householdId">;
};

interface Props {
  onSubmitSuccess: () => void;
}

export default function CreateHouseHoldForm({ onSubmitSuccess }: Props) {
  const dispatch = useAppDispatch();

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
    errors: {
      fontSize: 14,
      color: colors.darkPink,
      fontWeight: "500",
      paddingHorizontal: 10,
    },
    inputText: {
      backgroundColor: colors.surface,
      color: colors.onSurface,
      fontSize: 16,
      textAlign: "center",
      borderRadius: 8,
      height: 40,
      width: 200,
      paddingHorizontal: 16,
      marginVertical: 4,
    },
  });

  const defaultFormData: FormData = {
    house: { name: "" },
    member: {
      avatarId: 0,
    },
  };

  async function handleOnSubmit(values: FormData) {
    const response = await dispatch(createHouseHold(values));
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
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View style={styles.root}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={styles.inputText}
              placeholder={"hushållets namn"}
              onChangeText={handleChange("house.name")}
              onBlur={handleBlur("house.name")}
              value={values.house.name}
              clearTextOnFocus={true}
            />
            {errors.house && touched.house && (
              <Text style={styles.errors}>{errors.house.name}</Text>
            )}
          </View>
          <View style={{ marginHorizontal: 25, marginVertical: 30 }}>
            <AvatarList
              value={values.member.avatarId}
              onChange={(value) =>
                setFieldValue("member.avatarId", parseFloat(value))
              }
            />
          </View>
          {errors.member && touched.member && (
            <Text style={styles.errors}>{errors.member.avatarId}</Text>
          )}
          <View style={{ marginVertical: 100 }}>
            <CustomButton
              icon={"plus-circle-outline"}
              title={"Spara"}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
