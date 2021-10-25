import { CompositeScreenProps, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { Button, Modal } from "react-native-paper";
import ChoreView from "../../components/ChoreView";
import CustomButton from "../../components/common/CustomButton";
import AdminChoreModal from "../../components/modals/adminChoreModal";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import DetailsChoreModal from "../../components/modals/detailsChoreModal";

type Props = CompositeScreenProps<
  HouseholdStackScreenProps<"idag">,
  ProfileStackScreenProps<"Profile">
>;

export default function ChoresScreen({ navigation, route }: Props) {
  const householdId = route.params.id;
  const [openAdd, setOpenAdd] = useState(false);
  const [openChore, setOpenChore] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { colors } = useTheme();
  const [choreExist, setChoreExist] = useState(false);
  const [choreId, setChoreId] = useState("");

  function onSelectedChore(id: string) {
    setChoreExist(true);
    setChoreId(id);
    setOpenChore(true);
  }

  return (
    <>
      <View style={styles.choreList}>
        <ScrollView>
          <ChoreView
            onSelectedChore={onSelectedChore}
            householdId={householdId}
          />
        </ScrollView>
        <View style={styles.buttonView}>
          <CustomButton
            onPress={() => setOpenAdd(true)}
            title={"Lägg till syssla"}
            icon={"plus-circle-outline"}
          />
          <CustomButton
            onPress={() => navigation.navigate("Profile")}
            title={"Profil"}
            icon={"account-circle-outline"}
          />
        </View>
      </View>
      {openAdd && (
        <Modal
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
          }}
          style={{ elevation: 20 }}
          visible={openAdd}
          onDismiss={() => setOpenAdd(false)}
        >
          <AdminChoreModal
            onSave={() => setOpenAdd(false)}
            onClose={() => setOpenAdd(false)}
            householdId={householdId}
          />
        </Modal>
      )}
      {openChore && choreExist && (
        <>
          <Modal visible={openChore} onDismiss={() => setOpenChore(false)}>
            <DetailsChoreModal
              onDone={() => setOpenChore(false)}
              onClose={() => setOpenChore(false)}
              onEdit={() => {
                setOpenEdit(true);
                setChoreExist(true);
              }}
              choreId={choreId}
            />
          </Modal>
          {openEdit && choreExist && (
            <>
              <Modal
                contentContainerStyle={{ justifyContent: "center", flex: 1 }}
                visible={openChore}
                onDismiss={() => setOpenEdit(false)}
              >
                <AdminChoreModal
                  onSave={() => {
                    setOpenEdit(false), setOpenChore(false);
                  }}
                  onClose={() => setOpenEdit(false)}
                  choreId={choreId}
                  householdId={householdId}
                  onRemove={() => setOpenDelete(true)}
                />
              </Modal>
              {openDelete && (
                <Modal
                  visible={openChore}
                  onDismiss={() => setOpenDelete(false)}
                >
                  <Text style={{ color: colors.text }}>
                    Exampel Modal för att Tabort vald syssla. Click outside this
                    area to dismiss.
                  </Text>
                  <Button
                    onPress={() => {
                      setOpenDelete(false);
                      setOpenEdit(false);
                      setOpenChore(false);
                    }}
                  >
                    Ta bort
                  </Button>
                  <Button onPress={() => setOpenDelete(false)}>Stäng</Button>
                </Modal>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  choreList: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  buttonView: {
    width: "100%",
    height: "15%",
    // paddingHorizontal: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    // marginBottom: 20,
  },
});
