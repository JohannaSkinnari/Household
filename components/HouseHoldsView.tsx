import React, { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { selectUserHouseholds } from "../redux/houseHold/houseHoldSelector";
import { useAppSelector } from "../redux/reduxHooks";
import ConfirmLeaveHouseModal from "./modals/leaveHouseModal";

interface Props {
  onSelectedHouse: (id: string) => void;
  onSelectedHouseSetup: (id: string) => void;
  isVisible: boolean;
}

export default function HouseHoldView({
  onSelectedHouse,
  onSelectedHouseSetup,
  isVisible,
}: Props) {
  const { colors } = useTheme();
  const houseList = useAppSelector(selectUserHouseholds);
  const [openModal, setOpenModal] = useState(false);
  const [currentHouseId, setCurrentHouseId] = useState("");
  return (
    <>
      {houseList.map(({ house, member, avatar }) => (
        <View key={house.id}>
          <TouchableOpacity
            onPress={() => onSelectedHouse(house.id)}
            style={[styles.householdCard, { backgroundColor: colors.surface }]}
          >
            <Text
              style={{
                color: colors.onSurface,
                fontWeight: "500",
                fontSize: 18,
              }}
            >
              {house.name}
            </Text>
            <View style={styles.iconsContainer}>
              <Image
                style={[styles.crown, { height: member?.isAdmin ? 30 : 0 }]}
                source={require("../assets/images/crown.png")}
              />
              <Image style={styles.avatar} source={avatar?.icon} />
            </View>
          </TouchableOpacity>
          {isVisible ? (
            <View>
              <TouchableOpacity
                onPress={() => onSelectedHouseSetup(house.id)}
                style={[
                  styles.buttonStyle,
                  { backgroundColor: colors.surface },
                  { display: member?.isAdmin ? "flex" : "none" },
                ]}
                activeOpacity={0.5}
              >
                <View style={styles.buttonIconStyle}>
                  <SimpleLineIcons
                    name="settings"
                    size={18}
                    color={colors.darkPink}
                  />
                </View>

                <Text style={[{ color: colors.text }]}>Inställningar</Text>
              </TouchableOpacity>
              {/* ------------------different button renders------------------------- */}
              <TouchableOpacity
                onPress={() => {
                  setOpenModal(true);
                  setCurrentHouseId(house.id);
                }}
                style={[
                  styles.buttonStyle,
                  { backgroundColor: colors.darkPink },
                  { display: member?.isAdmin ? "none" : "flex" },
                ]}
                activeOpacity={0.5}
              >
                <View style={styles.buttonIconStyle}>
                  <SimpleLineIcons
                    name="exclamation"
                    size={18}
                    color={colors.surface}
                  />
                </View>

                <Text style={[{ color: colors.surface }]}>Lämna hus</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {openModal && (
            <>
              <Modal
                // eslint-disable-next-line react/jsx-boolean-value
                transparent={true}
              >
                <View style={styles.modalView}>
                  <ConfirmLeaveHouseModal
                    onClose={() => setOpenModal(false)}
                    onDelete={() => setOpenModal(false)}
                    houseId={currentHouseId}
                  />
                </View>
              </Modal>
            </>
          )}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  householdCard: {
    margin: 10,
    height: 50,
    width: 330,
    borderRadius: 12,
    paddingLeft: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  crown: {
    width: 30,
    marginRight: 8,
    alignItems: "center",
  },
  iconsContainer: {
    marginRight: 8,
    flexDirection: "row",
  },

  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#485a96",
    height: 25,
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: 120,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonIconStyle: {
    padding: 8,
  },
  toggleButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 4,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#485a96",
    height: 25,
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: 90,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  toggleButtonText: {
    fontSize: 12,
  },
  modalView: {
    position: "absolute",
    top: 225,
    height: "35%",
    width: "95%",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
});
