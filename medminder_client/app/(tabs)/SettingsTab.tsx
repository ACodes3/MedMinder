import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsTab: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => console.log("Logged out") },
    ]);
  };

  const handleLanguagePress = () => {
    Alert.alert("Language", "Language selection coming soon!");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#FF8DB7", "#FFA4C7"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Settings</Text>
      </LinearGradient>

      {/* White Rounded Card */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications */}
        <View style={styles.settingGroup}>
          <Text style={styles.groupTitle}>Notifications</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={22} color="#555" />
              <Text style={styles.settingText}>Enable Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor={notificationsEnabled ? "#FF8DB7" : "#ccc"}
              trackColor={{ true: "#FFD1E2", false: "#ddd" }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="alarm-outline" size={22} color="#555" />
              <Text style={styles.settingText}>Medication Reminders</Text>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              thumbColor={remindersEnabled ? "#FF8DB7" : "#ccc"}
              trackColor={{ true: "#FFD1E2", false: "#ddd" }}
            />
          </View>
        </View>

        {/* Display */}
        <View style={styles.settingGroup}>
          <Text style={styles.groupTitle}>Display</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={22} color="#555" />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? "#FF8DB7" : "#ccc"}
              trackColor={{ true: "#FFD1E2", false: "#ddd" }}
            />
          </View>

          <TouchableOpacity style={styles.settingRow} onPress={handleLanguagePress}>
            <View style={styles.settingLeft}>
              <Ionicons name="language-outline" size={22} color="#555" />
              <Text style={styles.settingText}>Language</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Account */}
        <View style={styles.settingGroup}>
          <Text style={styles.groupTitle}>Account</Text>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" size={22} color="#555" />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <Ionicons name="log-out-outline" size={22} color="#C53030" />
              <Text style={[styles.settingText, { color: "#C53030" }]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.settingGroup}>
          <Text style={styles.groupTitle}>About</Text>
          <Text style={styles.aboutText}>
            MedTrack helps you manage your daily medication schedule, ensuring you
            never miss a dose.
          </Text>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5FF",
  },
  header: {
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  settingGroup: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#777",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  settingRow: {
    backgroundColor: "#F8F8FF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  versionText: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 10,
  },
});
