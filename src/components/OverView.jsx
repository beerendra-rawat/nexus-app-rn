import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OverView() {
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.container}>

                <View style={styles.section}>
                    <View style={styles.subSection}>
                        <Image style={styles.icons} source={require("../assets/img/phone.png")} />
                        <Text>Phone Number</Text>
                        <Text>78965412369</Text>
                    </View>
                    <View style={styles.subSection}>
                        <Image style={styles.icons} source={require("../assets/img/phone.png")} />
                        <Text>Phone Number</Text>
                        <Text>78965412369</Text>
                    </View>
                    <View style={styles.subSection}>
                        <Image style={styles.icons} source={require("../assets/img/phone.png")} />
                        <Text>Phone Number</Text>
                        <Text>78965412369</Text>
                    </View>
                    <View style={styles.subSection}>
                        <Image style={styles.icons} source={require("../assets/img/phone.png")} />
                        <Text>Phone Number</Text>
                        <Text>78965412369</Text>
                    </View>
                    <View style={styles.subSection}>
                        <Image style={styles.icons} source={require("../assets/img/phone.png")} />
                        <Text>Phone Number</Text>
                        <Text>78965412369</Text>
                    </View>
                    <View style={styles.subSection}>
                        <Image style={styles.icons} source={require("../assets/img/phone.png")} />
                        <Text>Phone Number</Text>
                        <Text>78965412369</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    subSection:{
        flexDirection: 'row',
        gap: 16,
    },
    icons:{
        width: 20,
        height: 20,
    },
})