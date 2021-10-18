import React from "react";
import { Button, Text, View } from "react-native";
import { IChore } from "../interfaces/IChore";
import { addChore, deleteChore, editChore } from "../redux/chore/choreSlice";
import { useAppSelector } from "../redux/reduxHooks";
import { useAppDispatch } from "../redux/reduxStore";

// Visar lite hur det kan funka med våra reducers
// kan testa att bara lägga in den i rootnavigatorn och kommentera bort allt annat.
// Commita bara inte :D

export default function testScreen() {
  const dispatch = useAppDispatch();
  const chores = useAppSelector((state) => state.choresList.chores);

  console.log(chores);
  const onSave = () => {
    const dummyChore: IChore = {
      id: Math.random().toString(),
      name: Math.random().toString(),
      description: "moppa datorn, skura tangentbordet",
      interval: 1,
      weight: 1,
      lastCompleted: undefined,
    };
    dispatch(addChore(dummyChore));
    console.log(chores);
  };

  const deleteItem = (id: string) => {
    dispatch(deleteChore(id));
  };

  const editItem = (t: IChore) => {
    dispatch(editChore({ ...t, name: "städa" }));
  };
  return (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <View>
        {chores.map((choreItem) => (
          <View style={{ width: 150, paddingVertical: 10 }} key={choreItem.id}>
            <Text>{choreItem.name}</Text>
            <Text>{choreItem.description}</Text>
            <Button title="Remove" onPress={() => deleteItem(choreItem.id)} />
            <Button title="Edit" onPress={() => editItem(choreItem)} />
          </View>
        ))}
      </View>
      <View>
        <Button title="AddChore" onPress={onSave} />
      </View>
    </View>
  );
}
