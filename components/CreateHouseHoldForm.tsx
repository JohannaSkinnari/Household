import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import * as yup from "yup";
import { avatars } from "../assets/AvatarData/data";
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
      .max(18, "Namnet är för långt"),
  }),
  member: yup.object().shape<MemberValidationSchema>({
    avatarId: yup.number().min(1, "Välj en avatar"),
  }),
});

type FormData = {
  house: ICreateHouseHold;
  member: Omit<ICreateMember, "householdId" | "name" | "isApproved">;
};

interface Props {
  onSubmitSuccess: () => void;
}

export default function CreateHouseHoldForm({ onSubmitSuccess }: Props) {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

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
              placeholder="hushållets namn"
              onChangeText={handleChange("house.name")}
              onBlur={handleBlur("house.name")}
              value={values.house.name}
              clearTextOnFocus
            />
            {errors.house && touched.house && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.house.name}
              </Text>
            )}
            <View style={styles.avatarStyle}>
              <AvatarList
                dataArray={avatars}
                value={values.member.avatarId}
                onChange={value =>
                  setFieldValue("member.avatarId", parseFloat(value))
                }
              />
            </View>
            {errors.member && touched.member && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.member.avatarId}
              </Text>
            )}
            <View style={styles.buttonStyle}>
              <CustomButton
                icon="plus-circle-outline"
                title="Spara"
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
  avatarStyle: {
    marginHorizontal: 25,
    marginVertical: 30,
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
