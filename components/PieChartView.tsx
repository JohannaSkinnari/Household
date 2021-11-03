import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import PieChart from "react-native-pie-chart";

interface Props {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
  isTotal: boolean;
  title: string;
}

export default function PieChartView({
  widthAndHeight,
  series,
  sliceColor,
  isTotal,
  title,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
      />
      <Text
        style={[
          isTotal ? styles.title : styles.subTitel,
          { color: colors.text },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
  subTitel: {
    fontSize: 10,
    margin: 10,
  },
});
