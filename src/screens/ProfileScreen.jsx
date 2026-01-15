import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OverView from '../components/OverView';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top"]}>
      <View style={styles.container}>

        <View style={styles.topRow}>
          <TouchableOpacity>
            <Image style={styles.leftArrow} source={require("../assets/img/leftArrow.png")} />
          </TouchableOpacity>
          <Text>Beerendra Singh Rawat</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.profileRow}>
          <View style={styles.profileImg}>
            <Text style={styles.profileText}>BR</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Beerendra Singh Rawat</Text>
            <Text style={styles.id}>TCZI/225</Text>
            <Text style={styles.role}>Intern - Technology</Text>
            <Text style={styles.department}>Delivery</Text>
          </View>
        </View>

        <OverView />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  topRow: {
    flexDirection: 'row',
    gap: 15,
  },
  leftArrow: {
    width: 20,
    height: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  profileRow: {
    // flexDirection: 'row',
    alignItems: 'center',
  },

  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  profileText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  id: {
    fontSize: 14,
    color: '#666',
  },

  role: {
    fontSize: 14,
  },

  department: {
    fontSize: 14,
    color: '#555',
  },
});
