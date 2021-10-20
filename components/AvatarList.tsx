import React, { useState } from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import { avatars } from "../assets/AvatarData/data";

interface Props {
  value: number;
  onChange: (id: string) => void;
}

export default function AvatarList({ onChange }: Props) {
  const { colors } = useTheme();
  const [selectedAvatar, setSelectedAvatar] = useState<number>();
  return (
    <View style={{ height: 65 }}>
      <FlatList
        data={avatars}
        horizontal={true}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              onChange(String(item.id)), setSelectedAvatar(item.id);
            }}
          >
            <Image
              key={item.id}
              style={{
                borderRadius: 5,
                borderColor: colors.darkPink,
                borderWidth: item.id === selectedAvatar ? 1 : 0,
                marginHorizontal: 10,
                height: 60,
                width: 60,
              }}
              source={item.icon}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={onEnd}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
}
