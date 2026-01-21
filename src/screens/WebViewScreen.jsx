import { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { getAuthObject } from "../utils/HelperFun";

export default function WebViewScreen() {
  const DASHBOARD_URL = "https://nexus.techchefz.com/";
  const LOGIN_URL = "https://nexus-uat.techchefz.com/auth/login";

  const webViewRef = useRef(null);

  const [url, setUrl] = useState(LOGIN_URL);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(null);

  ///load authData
  useEffect(() => {
    const loadData = async () => {
      const auth = await getAuthObject();

      if (auth?.authToken && auth?.refreshToken) {
        setTokens({
          accessToken: auth.authToken,
          refreshToken: auth.refreshToken,
          visitorID: auth.deviceId,
          guid: auth.guid,
        });
        setUrl(DASHBOARD_URL);
      } else {
        setUrl(LOGIN_URL);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  //Bridge function
  const injectedJavaScript = `
    window.getAuthTokens = function () {
      window.ReactNativeWebView.postMessage("GET_TOKENS");
      return new Promise((resolve) => {
        window._resolveTokens = resolve;
      });
    };
    true;
  `;

  //Send Tokens
  const handleMessage = () => {
    if (!tokens) return;

    const script = `
      if (window._resolveTokens) {
        window._resolveTokens(${JSON.stringify(tokens)});
        window._resolveTokens = null;
      }
      true;
    `;
    webViewRef.current?.injectJavaScript(script);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0A58CA" />
      </View>
    );
  }

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: url }}
      javaScriptEnabled
      injectedJavaScript={injectedJavaScript}
      onMessage={handleMessage}
      startInLoadingState
    />
  );
}
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
