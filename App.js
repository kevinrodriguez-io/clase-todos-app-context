import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./navigation/MainStackNavigation";

import { TodosProvider } from "./context/TodosContext";

export default function App() {
  return (
    <TodosProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <MainStackNavigation />
      </NavigationContainer>
    </TodosProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
