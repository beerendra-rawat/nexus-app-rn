import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function AuthWebView() {
    const DASHBOARD_URL = "https://nexus-uat.techchefz.com/dashboard";

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: DASHBOARD_URL }}
                startInLoadingState
                renderLoading={() => (
                    <ActivityIndicator
                        size="large"
                        color="#0A58CA"
                        style={styles.loader}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loader: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -20,
        marginTop: -20,
    },
});
