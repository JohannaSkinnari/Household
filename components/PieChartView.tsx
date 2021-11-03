import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import PieChart from "react-native-pie-chart";
import type { MembersData } from "../screens/HouseHoldScreens/CurrentWeekStatisticScreen";

interface Props {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
  isTotal: boolean;
  title: string;
  data?: MembersData[];
}

export default function PieChartView({
  widthAndHeight,
  series,
  sliceColor,
  isTotal,
  title,
  data,
}: Props) {
  // const widthAndHeight = 250;
  // const series = [123, 321, 123, 789, 537];
  // const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];
  const { colors } = useTheme();

  return (
    // <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      {/* <Text style={styles.title}>Basic</Text> */}
      <PieChart
        widthAndHeight={widthAndHeight}
        // series={data?.map(d => d.totalWeight) || []}
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
      {/* <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut
          coverRadius={0.45}
          coverFill="#FFF"
        /> */}
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
