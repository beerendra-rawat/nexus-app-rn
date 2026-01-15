import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';


const { width } = Dimensions.get('window')

export default function GoogleAuthScreen() {

  GoogleSignin.configure({
    androidClientId:
      "131156201760-p4vpenkhd0dpk5e6nb379hqaac6sctlc.apps.googleusercontent.com",
    iosClientId:
      "131156201760-rpkenbo5umd4c455685oahtrjrd9isgb.apps.googleusercontent.com",
    scopes: ["openid", "profile", "email"],
  });


  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setUserInfo(response.data)
      }
      else {
        console.log("Sign inwas cancelled by user")
      }
    }
    catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert("sign in is in progress")
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("play services not available")
            break;
          default:
        }
      } else {
        Alert.alert("an error that's not related to google sign in occurred")
      }
    }
  }

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
              <TouchableOpacity style={styles.btnRow}
                onPress={handleGoogleSignIn}
              >
                <Image
                  source={require("../../src/assets/img/google.png")}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Login with Google</Text>
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





// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// // import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { useEffect, useState } from "react";

// // WebBrowser.maybeCompleteAuthSession();

// const { width } = Dimensions.get("window");

// export default function GoogleAuthScreen() {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   console.log("📌 GoogleAuthScreen rendered");

//   // ✅ GOOGLE AUTH CONFIG (EXPO GO SAFE)
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId:
//       "131156201760-p4vpenkhd0dpk5e6nb379hqaac6sctlc.apps.googleusercontent.com",
//     iosClientId:
//       "131156201760-rpkenbo5umd4c455685oahtrjrd9isgb.apps.googleusercontent.com",
//     scopes: ['openid',"profile", "email"],
//   });

//   // ✅ HANDLE GOOGLE RESPONSE
//   useEffect(() => {
//     console.log("📨 Google response:", response);

//     if (response?.type === "success") {
//       const accessToken = response.authentication?.accessToken;
//       console.log("✅ Google Access Token:", accessToken);
//       handleGoogleSuccess(accessToken);
//     }

//     if (response?.type === "error") {
//       console.log("❌ Google error:", response);
//       setLoading(false);
//       Alert.alert("Google Login Failed");
//     }
//   }, [response]);

//   // ✅ SEND TOKEN TO BACKEND → OPEN WEBVIEW
//   const handleGoogleSuccess = async (accessToken) => {
//     try {
//       if (!accessToken) throw new Error("Access token missing");

//       console.log("🌐 Sending token to backend...");

//       const res = await fetch(
//         "https://api-nexus-uat.techchefz.com/node/api/nexus/authentication/google?isNativeApp=true",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ accessToken }),
//         }
//       );

//       console.log("🌐 Backend status:", res.status);

//       const data = await res.json();
//       console.log("🟢 Backend response:", data);

//       if (!data?.authToken || !data?.redirectUrl) {
//         throw new Error("Invalid backend response");
//       }

//       await AsyncStorage.setItem("authToken", data.authToken);

//       console.log("➡ Navigating to WebView");

//       navigation.replace("AuthWebView", {
//         url: data.redirectUrl,
//         token: data.authToken,
//       });
//     } catch (err) {
//       console.log("🔴 Login error:", err);
//       Alert.alert("Login Failed", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ GOOGLE SIGN-IN BUTTON HANDLER
//   const googleSignInHandler = async () => {
//     try {
//       setLoading(true);
//       console.log("🟦 Google Sign-In pressed");

//       await promptAsync({
//         useProxy: true, // ✅ REQUIRED FOR EXPO GO
//         showInRecents: true,
//       });
//     } catch (err) {
//       console.log("🔴 Google Sign-In error:", err);
//       setLoading(false);
//       Alert.alert("Google Login Failed");
//     }
//   };

//   return (
//     <LinearGradient
//       colors={["#2F66C5", "#8FC3DA", "#2F66C5"]}
//       style={styles.container}
//     >
//       <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
//         <StatusBar style="light" />

//         <View style={styles.centerWrapper}>
//           <View style={styles.card}>
//             <Image
//               style={styles.logo}
//               source={require("../../src/assets/img/tczLogo.png")}
//             />

//             <Text style={styles.title}>Welcome to Nexus!</Text>

//             <Text style={styles.subTitle}>
//               Your gateway to workforce insights{"\n"}and project management.
//             </Text>

//             <TouchableOpacity
//               style={styles.btnRow}
//               onPress={googleSignInHandler}
//               disabled={!request || loading}
//             >
//               {loading ? (
//                 <>
//                   <ActivityIndicator color="#fff" />
//                   <Text style={styles.btnText}> Signing in...</Text>
//                 </>
//               ) : (
//                 <>
//                   <Image
//                     source={require("../../src/assets/img/google.png")}
//                     style={styles.btnImg}
//                   />
//                   <Text style={styles.btnText}>Login with Google</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },

//   centerWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 16,
//   },

//   card: {
//     width: "100%",
//     maxWidth: 380,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 24,
//     alignItems: "center",
//     elevation: 4,
//   },

//   logo: {
//     width: width * 0.55,
//     height: width * 0.2,
//     resizeMode: "contain",
//     marginBottom: 12,
//   },

//   title: {
//     fontSize: 24,
//     fontFamily: "DMSans-SemiBold",
//     color: "#000",
//   },

//   subTitle: {
//     fontSize: 16,
//     fontFamily: "DMSans-Regular",
//     textAlign: "center",
//     marginTop: 10,
//     color: "#444",
//   },

//   btnRow: {
//     width: "100%",
//     height: 56,
//     marginTop: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 8,
//     backgroundColor: "#2F66C5",
//   },

//   btnImg: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },

//   btnText: {
//     color: "#fff",
//     fontSize: 18,
//     fontFamily: "DMSans-Bold",
//   },
// });
