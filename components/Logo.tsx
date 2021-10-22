import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image source={require("../assets/images/Logo.png")} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 222,
    marginBottom: 20,
  },
});

export default Logo;
