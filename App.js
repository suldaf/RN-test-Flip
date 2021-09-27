import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

import DetailTransactionPage from "./src/Views/detail-transaction-page";
import ListTransactionPage from "./src/Views/list-transaction-page";
import store from "./src/Store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen
            name="List"
            component={ListTransactionPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailTransactionPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
