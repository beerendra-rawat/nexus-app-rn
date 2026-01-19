import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoogleAuthScreen from "./src/screens/GoogleAuthScreen";
import AuthWebView from "./src/screens/WebView";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    // DM Sans
    "DMSans-Regular": require("./src/assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Bold": require("./src/assets/fonts/DMSans-Bold.ttf"),
    "DMSans-SemiBold": require("./src/assets/fonts/DMSans-SemiBold.ttf")
  });
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GoogleAuth" component={GoogleAuthScreen} />
        <Stack.Screen name="AuthWebView" component={AuthWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
