import { Button, Card, Paragraph, Title, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, Text, View } from "react-native";
import { useStore } from "react-redux";
import { color } from "react-native-reanimated";

interface Props {
  onSave: () => void;
  onClose: () => void;
  // onSelectValueOne: () => void;
  // onSelectValueTwo: () => void;
  // onSelectValueFour: () => void;
  // onSelectValueSix: () => void;
  // onSelectValueEight: () => void;
}
export default function AdminChoreModal({ onSave, onClose}: Props) {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [showInterval, setShowInterval] = useState(false);
  const [showValue, setShowValue] = useState(false);
  // const [value, setValue] = useState(1);

  return (
    <Card style={styles.card}>
      <Card.Title title="Skapa en ny syssla" style={styles.cardTitle}/>
      <Card.Content style={[styles.cardContent, {backgroundColor: colors.background}]}>
        {/* <Title>Card title</Title>' */}
        {/* <TextInput
          mode="flat"
          // outlineColor={colors.surface}
          style={[styles.textInput, {backgroundColor: colors.surface,}]}
          underlineColor="#FFFFFF100"
          placeholder="Titel"
          // label="Syssla"
          value={name}
          onChangeText={(name: string) => setName(name)}
        /> */}
        <TextInput
          style={[styles.input, styles.textInput, {backgroundColor: colors.surface, color: colors.onSurface}]}
          placeholder="Titel"
          placeholderTextColor={colors.placeholder}
          onChangeText={(name: string) => setName(name)}
          value={name}
          // clearTextOnFocus={true}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput, {backgroundColor: colors.surface, color: colors.onSurface}]}
          multiline={true}
          placeholder="Beskrivning"
          placeholderTextColor={colors.placeholder}
          onChangeText={(discription: string) => setDiscription(discription)}
          value={discription}
          // clearTextOnFocus={true}
        />
        {!showInterval ? (<Pressable
          style={[styles.input, styles.interval, {backgroundColor: colors.surface}]}
          onPress={() => setShowInterval(true)}
        >
          <Text style={[styles.boldText, {color: colors.onSurface}]}>
            Återkommande: 
          </Text>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={[styles.normalText, {color: colors.onSurface}]}>
              var 
            </Text>
              <View style={[styles.litleCircle, {backgroundColor: colors.darkPink}]}> 
                <Text style={{color: colors.background}}>7</Text>
              </View>
            <Text style={[styles.normalText, {color: colors.onSurface}]}>
              dag
            </Text>
          </View>
        </Pressable>) :
        (<View
          style={[styles.input, styles.interval, {backgroundColor: colors.surface}]}
        >
          <Pressable onPress={() => setShowInterval(false)}>
            <Text style={[styles.boldText, {color: colors.onSurface}]}>
              Gå tillbaka 1 2 3 4 5 6
            </Text>
          </Pressable>
        </View>)}
        {!showValue ? (<Pressable
          style={[styles.input, styles.value, {backgroundColor: colors.surface}]}
          onPress={() => setShowValue(true)}
        >
          <View>
            <Text style={[styles.boldText, {color: colors.onSurface}]}>
              Värde: 
            </Text>
            <Text style={[styles.subText, {color: colors.disabled}]}>
              Hur energikrävande är sysslan?
            </Text>
          </View>
          <View style={[styles.litleCircle, {backgroundColor: colors.valueTwo}]}>
            <Text style={[styles.subText, {color: colors.onSurface}]}>
              2
            </Text>
          </View>
        </Pressable>) :
        (<View
          style={[styles.input, styles.value, {backgroundColor: colors.surface}]}
        >
          <View style={[styles.valueContainer, {borderLeftColor: colors.darkPink, borderRightColor: colors.darkPink}]}>
            <View style={[styles.valueInnerContainer, {borderRightColor: colors.darkPink}]}>
              <Pressable 
                style={[styles.valueCircle, styles.marginRight5, {backgroundColor: colors.valueOne}]} 
                onPress={() =>  setShowValue(false)}
              >
                <Text style={[{color: colors.text}]}>
                  1
                </Text>
              </Pressable>
            </View>
            <View style={[styles.valueInnerContainer, {borderRightColor: colors.darkPink}]}>
              <Pressable 
                 style={[styles.valueCircle, styles.marginRight5, {backgroundColor: colors.valueTwo}]}
                onPress={() => setShowValue(false)}
              >
                <Text style={[{color: colors.text}]}>
                  2
                </Text>
              </Pressable>
            </View>
            <View style={[styles.valueInnerContainer, {borderRightColor: colors.darkPink}]}>
              <Pressable 
                 style={[styles.valueCircle, styles.marginRight5, {backgroundColor: colors.valueFour}]} 
                onPress={() => setShowValue(false)}
              >
                <Text style={[{color: colors.text}]}>
                  4
                </Text>
              </Pressable>
            </View>
            <View style={[styles.valueInnerContainer, {borderRightColor: colors.darkPink}]}>
              <Pressable 
                 style={[styles.valueCircle, styles.marginRight5, {backgroundColor: colors.valueSix}]}  
                onPress={() => setShowValue(false)}
              >
                <Text style={[{color: colors.text}]}>
                  6
                </Text>
              </Pressable>
            </View>
            <View style={styles.valueLastInnerContainer}>
              <Pressable 
                 style={[styles.valueCircle, {backgroundColor: colors.valueEight}]}
                onPress={() => setShowValue(false)}
              >
                <Text style={[{color: colors.text}]}>
                  8
                </Text>
              </Pressable>
            </View>
          </View>
        </View>)}
      </Card.Content>
      <Card.Actions style={styles.cardAction}>
        <Button icon={"plus-circle-outline"} color={colors.text} onPress={onSave}>Spara</Button>
        <Button icon={"close-circle-outline"} color={colors.text} onPress={onClose}>Stäng</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    height: "95%",
    // width: "95%",
    borderRadius: 10,
    justifyContent: "space-between",
    // margin: 5,
    marginHorizontal: 5,
    // marginTop: -30,
    // marginBottom: 17
  },
  cardTitle: {
    height: "12%",
    // height: 66,
  },
  cardContent: {
    height: "76%",
    // height: 381,
    // backgroundColor: "red",
    paddingVertical: 5,
  },
  cardAction: {
    justifyContent: "space-around",
    height: "12%",
    // height: 66,
    padding: 5,
    // borderRadius: 20,
  },
  input: {
    // width: "100%",
    marginTop: 15,
    borderBottomWidth: 0,
    fontSize: 18,
    borderRadius: 10,
    paddingHorizontal: 16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,

    // flex: 0,
    // order: 0,
    alignSelf: "stretch",
    // flexGrow: 0,
  },
  textInput: {
    alignItems: "flex-start",
    height: 55,
  },
  descriptionInput: {
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    height: 125,
  },
  interval: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
  },
  value: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  normalText: {
    // fontWeight: "bold",
    fontSize: 18,
  },
  subText: {
    fontSize: 12,
  },
  valueContainer: {
    borderLeftWidth: 0.5, 
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    width: "100%", 
    // borderRightColor: "red", 
    borderRightWidth: 0.5,
    padding: 0,
    height: "100%"
  },
  valueInnerContainer: {
    borderRightWidth: 0.5, 
    justifyContent: "center", 
    alignItems: "center",
  },
  valueLastInnerContainer: {
    justifyContent: "center", 
    alignItems: "center",
  },
  valueCircle: {
    borderRadius: 50, 
    width: 48, 
    height: 48, 
    // backgroundColor: colors.disabled, 
    justifyContent: "center", 
    alignItems: "center",
  },
  marginRight5: {
    marginRight: 5,
  },
  litleCircle: {
    borderRadius: 50, 
    width: 25, 
    height: 25, 
    // backgroundColor: colors.disabled, 
    justifyContent: "center", 
    alignItems: "center",
    marginHorizontal: 8,
  },
})