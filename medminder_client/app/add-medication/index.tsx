import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const AddMedicationScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "everyX" | "weekly">(
    "daily"
  );
  const [daysInterval, setDaysInterval] = useState("2");
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [notes, setNotes] = useState("");

  const onChangeTime = (_: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const handleSave = () => {
    const purposeText = purpose === "Other" ? customPurpose : purpose;

    if (!name.trim()) {
      alert("Please enter a medication name");
      return;
    }
    if (!purposeText.trim()) {
      alert("Please select or enter a purpose");
      return;
    }

    alert(
      `Saved:\n${name}\n${dose}\nPurpose: ${purposeText}\n${frequency === "daily"
        ? "Daily"
        : frequency === "weekly"
        ? `Weekly on ${selectedDay}`
        : `Every ${daysInterval} days`
      }\nAt: ${time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    );
    router.back();
  };

  const purposeOptions = [
    { label: "Blood Pressure", value: "Blood Pressure" },
    { label: "Diabetes", value: "Diabetes" },
    { label: "Pain Relief", value: "Pain Relief" },
    { label: "Allergy", value: "Allergy" },
    { label: "Vitamins", value: "Vitamins" },
    { label: "Heart", value: "Heart" },
    { label: "Other", value: "Other" },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={["#FF8DB7", "#FFA4C7"]}
          style={[styles.header, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Medication</Text>
          <Image
            source={require("../../assets/images/pills-bg.png")}
            style={styles.pillDecoration}
          />
        </LinearGradient>

        {/* White Form Card (floating over gradient) */}
        <View style={styles.cardWrapper}>
          <ScrollView
            contentContainerStyle={styles.formCard}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardTopDivider} />

            {/* Name */}
            <Text style={styles.label}>Medication Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Valtum Plus"
              placeholderTextColor="#AAA"
              value={name}
              onChangeText={setName}
            />

            {/* Dose */}
            <Text style={styles.label}>Dose</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1 Capsule"
              placeholderTextColor="#AAA"
              value={dose}
              onChangeText={setDose}
            />

            {/* Purpose Dropdown */}
            <Text style={styles.label}>What is this for?</Text>
            <View style={styles.dropdownContainer}>
              <RNPickerSelect
                onValueChange={(value) => setPurpose(value)}
                placeholder={{ label: "Select a purpose...", value: "" }}
                items={purposeOptions}
                value={purpose}
                style={{
                  inputIOS: styles.dropdownInput,
                  inputAndroid: styles.dropdownInput,
                }}
              />
            </View>

            {purpose === "Other" && (
              <TextInput
                style={[styles.input, { marginTop: 8 }]}
                placeholder="Enter custom purpose"
                placeholderTextColor="#AAA"
                value={customPurpose}
                onChangeText={setCustomPurpose}
              />
            )}

            {/* Frequency */}
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyRow}>
              {[
                { key: "daily", label: "Daily" },
                { key: "everyX", label: "Every X days" },
                { key: "weekly", label: "Weekly" },
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={[
                    styles.frequencyOption,
                    frequency === opt.key && styles.activeFrequency,
                  ]}
                  onPress={() => setFrequency(opt.key as any)}
                >
                  <Text
                    style={[
                      styles.frequencyText,
                      frequency === opt.key && styles.activeFrequencyText,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {frequency === "everyX" && (
              <View style={styles.inlineField}>
                <Text style={styles.inlineLabel}>Every</Text>
                <TextInput
                  keyboardType="numeric"
                  style={[styles.input, styles.inlineInput]}
                  value={daysInterval}
                  onChangeText={setDaysInterval}
                />
                <Text style={styles.inlineLabel}>days</Text>
              </View>
            )}

            {frequency === "weekly" && (
              <View style={styles.weekdayRow}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayCircle,
                      selectedDay === day && styles.activeDay,
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selectedDay === day && styles.activeDayText,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Time */}
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.timeText}>
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChangeTime}
              />
            )}

            {/* Notes */}
            <Text style={styles.label}>Notes (optional)</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Add a note, e.g. 'Take after lunch'"
              placeholderTextColor="#AAA"
              multiline
              value={notes}
              onChangeText={setNotes}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
              <Text style={styles.addButtonText}>Save Medication</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AddMedicationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5FF",
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  pillDecoration: {
    position: "absolute",
    right: -10,
    bottom: -10,
    width: 130,
    height: 130,
    opacity: 0.9,
    resizeMode: "contain",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  backText: {
    fontSize: 22,
    color: "#fff",
  },

  // Card overlay setup
  cardWrapper: {
    position: "absolute",
    top: 175, // overlaps header nicely
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flex: 1,
  },
  formCard: {
    flexGrow: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTopDivider: {
    width: 60,
    height: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: "#F8F8FF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#333",
  },

  dropdownContainer: {
    backgroundColor: "#F8F8FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEE",
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  dropdownInput: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 0,
  },

  frequencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  frequencyOption: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    borderRadius: 14,
    marginHorizontal: 4,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeFrequency: {
    backgroundColor: "#5A31F4",
  },
  frequencyText: {
    color: "#555",
    fontSize: 13,
  },
  activeFrequencyText: {
    color: "#fff",
    fontWeight: "600",
  },

  inlineField: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  inlineLabel: {
    fontSize: 14,
    color: "#444",
    marginHorizontal: 6,
  },
  inlineInput: {
    flex: 0.3,
    textAlign: "center",
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  activeDay: {
    backgroundColor: "#5A31F4",
  },
  dayText: {
    color: "#777",
    fontSize: 12,
  },
  activeDayText: {
    color: "#fff",
    fontWeight: "700",
  },
  timeInput: {
    backgroundColor: "#F8F8FF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  timeText: {
    fontSize: 15,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#5A31F4",
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 30,
    alignItems: "center",
    shadowColor: "#5A31F4",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
