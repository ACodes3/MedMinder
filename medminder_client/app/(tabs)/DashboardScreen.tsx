import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type Medication = {
  id: string;
  name: string;
  dose: string;
  time: string;
  icon: any;
};

const medications: Medication[] = [
  {
    id: "1",
    name: "Vitamin C",
    dose: "2 Capsule",
    time: "6:30 am",
    icon: require("../../assets/images/vit-c.jpg"),
  },
  {
    id: "2",
    name: "Valtum plus 25",
    dose: "2 Pills",
    time: "8:00 am",
    icon: require("../../assets/images/pill-icon.jpg"),
  },
  {
    id: "3",
    name: "Centrum",
    dose: "1 Capsule",
    time: "10:30 pm",
    icon: require("../../assets/images/centrum.jpg"),
  },
  {
    id: "4",
    name: "Coldrain All In 1",
    dose: "1 Capsule",
    time: "12:30 pm",
    icon: require("../../assets/images/coldrain.jpg"),
  },
  {
    id: "5",
    name: "Neuherbs T",
    dose: "2 Capsule",
    time: "1:00 pm",
    icon: require("../../assets/images/neuherbs.jpg"),
  },
];

const DashboardScreen: React.FC = () => {
  const router = useRouter();
  const renderItem = ({ item }: { item: Medication }) => {
    const isHighlighted = item.name === "Centrum";
    return (
      <View
        style={[styles.medicineCard, isHighlighted && styles.highlightCard]}
      >
        <View style={styles.medicineInfo}>
          <Image source={item.icon} style={styles.medicineIcon} />
          <View>
            <Text
              style={[
                styles.medicineName,
                isHighlighted && styles.highlightText,
              ]}
            >
              {item.name}
            </Text>
            <Text style={styles.medicineDose}>{item.dose}</Text>
          </View>
        </View>
        <Text style={styles.medicineTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={["#FF8DB7", "#FFA4C7"]} style={styles.header}>
        {/* Decorative Pills */}
        <Image
          source={require("../../assets/images/pills-bg.png")}
          style={styles.pillDecoration}
        />

        <View style={styles.headerTop}>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.helloText}>Hello</Text>
            <Text style={styles.userName}>Alina Bon</Text>
          </View>
        </View>
        <Text style={styles.title}>Your Dashboard</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => router.push("/add-medication" as any)}>
          <Text style={styles.startButtonText}>Add Medication</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* White Card Section */}
      <View style={styles.whiteCard}>
        {/* Calendar */}
        <View style={styles.calendarWrapper}>
          {/* Day Letters */}
          <View style={styles.daysRow}>
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <Text key={i} style={styles.dayLetter}>
                {day}
              </Text>
            ))}
          </View>

          {/* Dates */}
          <View style={styles.datesRow}>
            {[1, 2, 3, 4, 5, 6, 7].map((date, i) => {
              const isActive = date === 5;
              return (
                <View
                  key={i}
                  style={[styles.dateCircle, isActive && styles.activeDateCircle]}
                >
                  <Text
                    style={[styles.dateText, isActive && styles.activeDateText]}
                  >
                    {date}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Medication List */}
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5FF",
  },
  header: {
    height: 250,
    paddingHorizontal: 24,
    paddingTop: 30,
    overflow: "hidden",
  },
  pillDecoration: {
    position: "absolute",
    right: -15,
    bottom: -15,
    width: 200,
    height: 200,
    resizeMode: "contain",
    opacity: 0.9,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  helloText: {
    color: "#fff",
    opacity: 0.8,
    fontSize: 14,
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  startButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignSelf: "flex-start",
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: "#333",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },

  /** White Card **/
  whiteCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -35,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  /** Calendar **/
  calendarWrapper: {
    paddingHorizontal: 28,
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dayLetter: {
    fontSize: 13,
    color: "#999",
  },
  datesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
  },
  activeDateCircle: {
    backgroundColor: "#ca2d9eff",
  },
  activeDateText: {
    color: "#fff",
    fontWeight: "700",
  },

  /** Medications **/
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 10,
  },
  medicineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  highlightCard: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  medicineInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  medicineIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginRight: 14,
  },
  medicineName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  highlightText: {
    fontWeight: "700",
  },
  medicineDose: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  medicineTime: {
    fontSize: 13,
    color: "#777",
  },
});
