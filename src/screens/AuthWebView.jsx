import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

export default function AuthWebView() {
  const route = useRoute();
  const { url, token } = route.params;

  console.log("🌐 Opening WebView:", url);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: url,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </View>
  );
}
