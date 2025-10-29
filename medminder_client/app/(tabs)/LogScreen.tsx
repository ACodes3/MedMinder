import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MedicationLog = {
  id: string;
  name: string;
  dose: string;
  dateTime: string; // ISO format
  status: "taken" | "missed" | "upcoming";
};

const medicationLogs: MedicationLog[] = [
  { id: "1", name: "Valtum Plus", dose: "2 Pills", dateTime: "2025-10-28T08:00:00", status: "taken" },
  { id: "2", name: "Vitamin C", dose: "1 Capsule", dateTime: "2025-10-28T13:00:00", status: "missed" },
  { id: "3", name: "Centrum", dose: "1 Tablet", dateTime: "2025-10-29T21:00:00", status: "upcoming" },
  { id: "4", name: "Coldrain All In 1", dose: "1 Capsule", dateTime: "2025-10-27T10:30:00", status: "taken" },
  { id: "5", name: "Neuherbs T", dose: "2 Capsules", dateTime: "2025-10-26T12:00:00", status: "missed" },
];

// ✅ Move this helper ABOVE the useMemo
function formatDateHeader(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();

  // remove hours for date-only comparison
  const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
  const targetMidnight = new Date(date.setHours(0, 0, 0, 0));
  const diffDays = Math.round((todayMidnight.getTime() - targetMidnight.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

const LogScreen: React.FC = () => {
  const sections = useMemo(() => {
    // Sort descending by date
    const sorted = [...medicationLogs].sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );

    // Group by date key
    const grouped: Record<string, MedicationLog[]> = {};
    sorted.forEach((log) => {
      const dateKey = new Date(log.dateTime).toDateString();
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(log);
    });

    return Object.entries(grouped).map(([date, data]) => ({
      title: formatDateHeader(date),
      data,
    }));
  }, []);

  const renderItem = ({ item }: { item: MedicationLog }) => {
    const statusColors = {
      taken: { bg: "#C6F6D5", text: "#2F855A", label: "Taken" },
      missed: { bg: "#FED7D7", text: "#C53030", label: "Missed" },
      upcoming: { bg: "#BEE3F8", text: "#2B6CB0", label: "Upcoming" },
    };

    const time = new Date(item.dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const s = statusColors[item.status];

    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Text style={styles.medicineDose}>{item.dose}</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.time}>{time}</Text>
          <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
            <Text style={[styles.statusText, { color: s.text }]}>{s.label}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#FF8DB7", "#FFA4C7"]} style={styles.header}>
        <Text style={styles.headerTitle}>Medication History</Text>
      </LinearGradient>

      <View style={styles.content}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default LogScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F5FF" },
  header: {
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContent: { paddingBottom: 30 },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#444",
    marginBottom: 10,
    marginTop: 15,
  },
  card: {
    backgroundColor: "#F8F8FF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  medicineName: { fontSize: 16, fontWeight: "600", color: "#222" },
  medicineDose: { fontSize: 13, color: "#666", marginTop: 2 },
  rightSide: { alignItems: "flex-end" },
  time: { fontSize: 13, color: "#444", marginBottom: 6 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: "600", textTransform: "capitalize" },
});
