import { CompositeScreenProps } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Modal } from "react-native-paper";
import ChoreView from "../../components/ChoreView";
import CustomButton from "../../components/common/CustomButton";
import AdminChoreModal from "../../components/modals/adminChoreModal";
import DeleteChoreModal from "../../components/modals/deleteChoreModal";
import DetailsChoreModal from "../../components/modals/detailsChoreModal";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { selectOwnerOfHousehold } from "../../redux/member/memberSelectors";
import { useAppSelector } from "../../redux/reduxHooks";

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
  const [choreExist, setChoreExist] = useState(false);
  const [choreId, setChoreId] = useState("");

  function onSelectedChore(id: string) {
    setChoreExist(true);
    setChoreId(id);
    setOpenChore(true);
  }

  const admin = useAppSelector(selectOwnerOfHousehold(householdId));

  return (
    <>
      <View style={styles.choreList}>
        <ScrollView>
          <ChoreView
            onSelectedChore={onSelectedChore}
            householdId={householdId}
          />
        </ScrollView>
        <View
          style={[
            styles.buttonView,
            { justifyContent: admin?.isAdmin ? "space-evenly" : "center" },
          ]}
        >
          {admin?.isAdmin ? (
            <CustomButton
              onPress={() => setOpenAdd(true)}
              title="Lägg till syssla"
              icon="plus-circle-outline"
            />
          ) : (
            <View style={{ height: 0, width: 0 }} />
          )}
          <CustomButton
            onPress={() => navigation.navigate("Profile")}
            title="Profil"
            icon="account-circle-outline"
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
            onRemove={() => ({})}
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
              householdId={householdId}
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
                    setOpenEdit(false);
                    setOpenChore(false);
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
                  <DeleteChoreModal
                    onArchive={() => {
                      setOpenDelete(false);
                      setOpenEdit(false);
                      setOpenChore(false);
                    }}
                    onClose={() => setOpenDelete(false)}
                    onDelete={() => {
                      setOpenDelete(false);
                      setOpenEdit(false);
                      setOpenChore(false);
                    }}
                    choreId={choreId}
                  />
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
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});
