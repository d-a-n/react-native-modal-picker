"use strict";

import React, { useRef, useState } from "react";

import { View, Text, TextInput, Switch, Image, Alert } from "react-native";

import ModalSelector from "react-native-modal-selector";
import { countryList } from "./assets/CountryList";

export const SampleApp = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const ref = useRef<ModalSelector>();

  let index = 0;
  const data = [
    { key: index++, section: true, label: "Fruits" },
    {
      key: index++,
      label: "Red Apples",
      component: (
        <View
          style={{
            backgroundColor: "red",
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Red Apples custom component ☺</Text>
        </View>
      ),
    },
    { key: index++, label: "Cherries" },
    { key: index++, label: "Cranberries" },
    { key: index++, label: "Pink Grapefruit" },
    { key: index++, label: "Raspberries" },
    { key: index++, section: true, label: "Vegetables" },
    { key: index++, label: "Beets" },
    { key: index++, label: "Red Peppers" },
    { key: index++, label: "Radishes" },
    { key: index++, label: "Radicchio" },
    { key: index++, label: "Red Onions" },
    { key: index++, label: "Red Potatoes" },
    { key: index++, label: "Rhubarb" },
    { key: index++, label: "Tomatoes" },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "space-around", padding: 50 }}>
      {/* Default mode: a clickable button will re rendered */}
      <ModalSelector
        data={data}
        initValue="Select something yummy!"
        initValueTextStyle={{ color: "black" }}
        selectStyle={{ borderColor: "black" }}
        selectTextStyle={{ color: "blue" }}
        onChange={(option) => {
          Alert.alert(`${option.label} (${option.key}) nom nom nom`);
        }}
      />

      {/*
                    Wrapper mode: just wrap your existing component with ModalSelector.
                    When the user clicks on your element, the modal selector is shown.
                 */}
      <ModalSelector
        data={data}
        initValue="Select something yummy!"
        onChange={(option) => {
          setTextInputValue(option.label);
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            height: 40,
          }}
          editable={false}
          placeholder="Select something yummy!"
          placeholderTextColor={"black"}
          value={textInputValue}
        />
      </ModalSelector>

      {/*
                    Custom mode: you have to provide a react-native component that have to
                    control how the selector should open (and for this you need a ref to the modal)
                 */}
      <ModalSelector
        data={data}
        ref={ref}
        customSelector={
          <Switch
            style={{ alignSelf: "center" }}
            onValueChange={() => ref.current.open()}
            thumbColor={"#88f"}
          />
        }
      />

      {/* Default mode: a clickable button will re rendered with FlatList */}
      <ModalSelector
        data={countryList}
        listType="FLATLIST"
        keyExtractor={(x) => x.name}
        labelExtractor={(x) => x.name}
        initValue="listType with FlatList"
        initValueTextStyle={{ color: "black" }}
        selectStyle={{ borderColor: "black" }}
        selectTextStyle={{ color: "blue" }}
        onChange={(option) => {
          setTextInputValue(option.name);
        }}
        componentExtractor={(option) => <ListItem data={option} />}
      />

      {/* Default mode: a clickable button will re rendered without FlatList */}
      <ModalSelector
        data={countryList}
        keyExtractor={(x) => x.name}
        labelExtractor={(x) => x.name}
        initValue="listType without FlatList"
        initValueTextStyle={{ color: "black" }}
        selectStyle={{ borderColor: "black" }}
        selectTextStyle={{ color: "blue" }}
        onChange={(option) => {
          setTextInputValue(option.name);
        }}
        componentExtractor={(option) => <ListItem data={option} />}
      />

      {/* With a fixed header at the top of the list  */}
      <ModalSelector
        data={countryList}
        keyExtractor={(x) => x.name}
        labelExtractor={(x) => x.name}
        initValue="listType without FlatList but fixed header"
        initValueTextStyle={{ color: "black" }}
        selectStyle={{ borderColor: "black" }}
        selectTextStyle={{ color: "blue" }}
        onChange={(option) => {
          setTextInputValue(option.name);
        }}
        componentExtractor={(option) => <ListItem data={option} />}
        header={
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: 'black' }}>What country would you pick?</Text>
            <Text style={{ fontSize: 13, color: '#bbbbbb' }}>
              Please, select an option
            </Text>
          </View>
        }
      />
    </View>
  );
};

const ListItem = ({ data }) => {
  return (
    <View key={data.number} style={{ flexDirection: "row" }}>
      <Image
        style={{ width: 26, height: 26, borderRadius: 13 }}
        resizeMode="cover"
        source={{ uri: data.flag }}
      />
      <Text> {data.number}</Text>
      <Text> {data.name}</Text>
    </View>
  );
};

export default SampleApp;
