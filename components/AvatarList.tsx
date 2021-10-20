import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { avatars } from "../assets/AvatarData/data";

interface Props {
  onChange: (id: string) => void;
}

export default function AvatarList({ onChange }: Props) {
  return (
    <View style={{ height: 65 }}>
      <FlatList
        data={avatars}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChange(String(item.id))}>
            <Image
              key={item.id}
              style={{ marginHorizontal: 10, height: 60, width: 60 }}
              source={item.icon}
            />
          </TouchableOpacity>
        )}
        //keyExtractor={(t) => t.id.toString()}
        // onEndReached={onEnd}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
}
