import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import * as yup from "yup";
import AvatarList from "../../components/AvatarList";
import CustomButton from "../../components/common/CustomButton";
import { ICreateMember } from "../../interfaces/IMember";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { createMember } from "../../redux/member/memberThunk";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";

export default function HouseholdInfoScreen({
  navigation,
  route,
}: ProfileStackScreenProps<"HouseholdInfo">) {
  const houseId = route.params.id;
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const avatars = useAppSelector(
    a => a.memberList.availableHouseholdMemberAvatars
  );

  type RootValidationSchema = Record<keyof FormData, yup.AnySchema>;

  const validationSchema = yup.object().shape<RootValidationSchema>({
    avatarId: yup.number().min(1, "Välj en avatar"),
  });

  type FormData = {
    avatarId: number;
  };

  const defaultFormData: ICreateMember = {
    avatarId: 0,
    householdId: houseId,
  };

  async function handleOnSubmit(values: ICreateMember) {
    const response = await dispatch(createMember(values));
    if (response.meta.requestStatus === "fulfilled") {
      navigation.navigate("Profile");
    }
  }

  return (
    <Formik
      initialValues={defaultFormData}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ setFieldValue, handleSubmit, values, touched, errors }) => (
        <View style={styles.root}>
          <View style={styles.infoStyle}>
            <Text style={[styles.textStyle, { color: colors.onSurface }]}>
              Välj din avatar
            </Text>
            <Text style={{ color: colors.onSurface }}>
              (Tillgängliga avatarer i hushållet)
            </Text>
          </View>
          <View style={styles.imageStyle}>
            <AvatarList
              value={values.avatarId}
              onChange={value => setFieldValue("avatarId", parseFloat(value))}
              dataArray={avatars}
            />
          </View>
          <View style={{ flex: 1 }}>
            {errors.avatarId && touched.avatarId && (
              <Text style={[styles.errors, { color: colors.darkPink }]}>
                {errors.avatarId}
              </Text>
            )}
          </View>
          <View style={styles.buttonsContainer}>
            <CustomButton
              icon="plus-circle-outline"
              title="Spara"
              onPress={handleSubmit}
            />
            <CustomButton
              icon="close-circle-outline"
              title="Stäng"
              onPress={() => navigation.navigate("Profile")}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  infoStyle: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsContainer: {
    padding: 10,
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  errors: {
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
