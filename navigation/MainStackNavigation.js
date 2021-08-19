import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { List } from "../views/Todos/List";
import { Add } from "../views/Todos/Add";
import { Detail } from "../views/Todos/Detail";

const MainStackNavigator = createNativeStackNavigator();

export const MainStackNavigation = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="TODO_LIST"
        component={List}
        options={{
          headerTitle: "Todos",
        }}
      />
      <MainStackNavigator.Screen name="TODO_DETAIL" component={Detail} />
      <MainStackNavigator.Screen name="TODO_ADD" component={Add} />
    </MainStackNavigator.Navigator>
  );
};
