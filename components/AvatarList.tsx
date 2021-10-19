import React from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { avatars } from "../assets/AvatarData/data";
interface AvatarObj {
  item: { id: string; icon: string };
}
export default function AvatarList() {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity>
      <Image
        key={item.id}
        style={{ height: 60, width: 60 }}
        source={item.icon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ height: 65 }}>
      <FlatList
        data={avatars}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(t) => t.id.toString()}
        // onEndReached={setIstrue(true) as any}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
}

// export default function AvatarList() {
//   return (
//     <>
//       {avatars.map((item) => (
//         <Image
//           key={item.id}
//           style={{ height: 60, width: 60 }}
//           source={item.icon}
//         />
//       ))}
//     </>
//   );
// }
