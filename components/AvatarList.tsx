import React from "react";
import { View, Image } from "react-native";
import { avatars } from "../assets/AvatarData/data";

export default function AvatarList() {
  return (
    <>
      {avatars.map((item) => (
        <Image
          key={item.id}
          style={{ height: 30, width: 30, justifyContent: "space-between" }}
          source={item.icon}
        />
      ))}
    </>
  );
}
