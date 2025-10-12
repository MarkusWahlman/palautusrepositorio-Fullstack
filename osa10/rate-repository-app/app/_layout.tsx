import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/AppBar";
import { ApolloProvider } from "@apollo/client/react";
import AuthStorage from "@/utils/authStorage";
import AuthStorageContext from "@/context/authStorageContext";
import { createApolloClient } from "@/utils/createApolloClient";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppBar />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="myreviews" options={{ headerShown: false }} />
            <Stack.Screen name="review" options={{ headerShown: false }} />
            <Stack.Screen
              name="repository/[id]"
              options={{ headerShown: false }}
            />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaView>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
