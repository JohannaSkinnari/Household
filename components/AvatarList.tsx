import React, { useState } from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";

interface IAvatar {
  icon: any;
  id: number;
}

interface Props {
  value: number;
  dataArray: IAvatar[];
  onChange: (id: string) => void;
}

export default function AvatarList({ onChange, dataArray }: Props) {
  const { colors } = useTheme();
  const [selectedAvatar, setSelectedAvatar] = useState<number>();
  const [colorValue, setColorValue] = useState<string>();

  const selectValue = (value: number) => {
    switch (value) {
      case 1:
        setColorValue(colors.yellow);
        break;
      case 2:
        setColorValue(colors.blue);
        break;
      case 3:
        setColorValue(colors.orange);
        break;
      case 4:
        setColorValue(colors.green);
        break;
      case 5:
        setColorValue(colors.darkPink);
        break;
      case 6:
        setColorValue(colors.brown);
        break;
      case 7:
        setColorValue(colors.pink);
        break;
      case 8:
        setColorValue(colors.purple);
        break;
      default:
        setColorValue(colors.textInput);
        break;
    }
  };

  return (
    <View style={{ height: 65 }}>
      <FlatList
        data={dataArray}
        horizontal
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              onChange(String(item.id));
              setSelectedAvatar(item.id);
              selectValue(item.id);
            }}
          >
            <Image
              key={item.id}
              style={{
                borderRadius: 15,
                borderColor: colorValue,
                borderWidth: item.id === selectedAvatar ? 1 : 0,
                marginHorizontal: 10,
                height: 60,
                width: 60,
              }}
              source={item.icon}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}
