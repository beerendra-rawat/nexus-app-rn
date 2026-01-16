import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { setAuthData } from "../utils/authBridge";

const { width } = Dimensions.get('window')

export default function GoogleAuthScreen() {

  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     // webClientId: "131156201760-7f0b6p3u65ml465pe09klcoo1j2hk2d3.apps.googleusercontent.com",
  //     androidClientId:
  //       "131156201760-p4vpenkhd0dpk5e6nb379hqaac6sctlc.apps.googleusercontent.com",
  //     iosClientId:
  //       "131156201760-rpkenbo5umd4c455685oahtrjrd9isgb.apps.googleusercontent.com",
  //     scopes: ["openid", "profile", "email"],
  //   });
  // },[])

  GoogleSignin.configure({
    webClientId: "131156201760-7f0b6p3u65ml465pe09klcoo1j2hk2d3.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    offlineAccess: true,
  });


  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      console.log("🔵 Google Sign-In started");

      const data = await GoogleSignin.hasPlayServices();
      console.log(data)

      const response = await GoogleSignin.signIn()
      console.log("✅ Google response:", response);

      if (!isSuccessResponse(response)) {
        console.log("❌ Google Sign-In not successful:", response)
      }

      const idToken = response.idToken
      if (!idToken) {
        throw new Error("No idToken received")
      }
      console.log("🟢 idToken received");

      const userInfo = response.data
      console.log("✅ Google user info:", userInfo);

      const backendResponse = await fetch(
        "https://api-nexus-uat.techchefz.com/node/api/nexus/authentication/google?isNativeApp=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        }
      )

      const authData = await backendResponse.json()
      console.log("🟢 Backend response:", authData);

      // 💾 Save using bridge
      await setAuthData(authData)

      // 🚀 Redirect
      navigation.replace("AuthWebView")
    }

    catch (error) {
      console.error("❌ Sign-in error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.error('Sign-in error:', error);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <LinearGradient
      colors={['#2F66C5', '#8FC3DA', '#2F66C5']}
      locations={[0, 0.5, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeAreaView} edges={["top"]}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.centerWrapper}>
            <View style={styles.card}>
              <View>
                <Image style={styles.logo}
                  source={require("../../src/assets/img/tczLogo.png")}
                />
              </View>
              <View>
                <Text style={styles.title}>Welcome to Nexus!</Text>
              </View>
              <View>
                <Text style={styles.subTitle}>Your gateway to workforce insights{"\n"}and project management.</Text>
              </View>
              <TouchableOpacity
                style={styles.btnRow}
                disabled={loading}
                onPress={handleGoogleSignIn}
              >
                {loading ? (
                  <>
                    <ActivityIndicator size={"large"} color={"#fff"} />
                    <Text style={styles.btnText}>Signin in...</Text>
                  </>
                ) : (
                  <>
                    <Image
                      source={require("../../src/assets/img/google.png")}
                      style={styles.btnImg}
                    />
                    <Text style={styles.btnText}>Login with Google</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#fff"
  },
  logo: {
    width: width * 0.55,
    height: width * 0.2,
  },
  title: {
    fontSize: 24,
    fontWeight: 540,
    fontFamily: "DMSans-SemiBold",
    paddingTop: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 660,
    fontFamily: "DMSans-Regular",
    textAlign: 'center',
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  btnRow: {
    width: "100%",
    height: 56,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#2F66C5',
  },
  btnImg: {
    width: 20,
    height: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: "DMSans-Bold",
  },

})