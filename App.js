import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import GoogleAuthScreen from "./src/screens/GoogleAuthScreen"
// import HomeScreen from './src/screens/HomeScreen';
// import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {

  const [fontsLoaded] = useFonts({
    // DM Sans
    'DMSans-Regular': require('./src/assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Bold': require('./src/assets/fonts/DMSans-Bold.ttf'),
    'DMSans-SemiBold': require('./src/assets/fonts/DMSans-SemiBold.ttf'),

    // Inter
    'Inter-Regular': require('./src/assets/fonts/Inter_28pt-Regular.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter_28pt-Medium.ttf'),
    'Inter-SemiBold': require('./src/assets/fonts/Inter_28pt-SemiBold.ttf'),
    'Inter-Bold': require('./src/assets/fonts/Inter_28pt-Bold.ttf'),

    // Lora
    'Lora-Regular': require('./src/assets/fonts/Lora-Regular.ttf'),
    'Lora-Medium': require('./src/assets/fonts/Lora-Medium.ttf'),
    'Lora-SemiBold': require('./src/assets/fonts/Lora-SemiBold.ttf'),
    'Lora-Bold': require('./src/assets/fonts/Lora-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <GoogleAuthScreen />
      {/* <HomeScreen /> */}
      {/* <ProfileScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});

