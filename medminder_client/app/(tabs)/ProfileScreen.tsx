import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState("Alina Bon");
  const [age, setAge] = useState("28");
  const [gender, setGender] = useState("Female");
  const [height, setHeight] = useState("168"); // cm
  const [weight, setWeight] = useState("60"); // kg

  // 🧮 Automatically calculate BMI
  const bmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return "0";
    return (w / Math.pow(h / 100, 2)).toFixed(1);
  }, [height, weight]);

  // 💡 Determine BMI Category
  const bmiCategory = useMemo(() => {
    const b = parseFloat(bmi);
    if (b === 0) return "";
    if (b < 18.5) return "Underweight";
    if (b < 25) return "Normal";
    if (b < 30) return "Overweight";
    return "Obese";
  }, [bmi]);

  // 🎨 Color for BMI status
  const bmiColors: Record<string, string> = {
    Underweight: "#2B6CB0",
    Normal: "#38A169",
    Overweight: "#DD6B20",
    Obese: "#C53030",
  };

  const bmiColor = bmiColors[bmiCategory] || "#666";

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#FF8DB7", "#FFA4C7"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      {/* White Rounded Card */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Age */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            keyboardType="numeric"
            onChangeText={setAge}
            placeholder="Enter age"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Gender */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="Male / Female / Other"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Height */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            keyboardType="numeric"
            onChangeText={setHeight}
            placeholder="Enter height"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Weight */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            keyboardType="numeric"
            onChangeText={setWeight}
            placeholder="Enter weight"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* BMI Display */}
        <View style={styles.bmiContainer}>
          <Text style={styles.bmiLabel}>Your BMI</Text>
          <Text style={[styles.bmiValue, { color: bmiColor }]}>{bmi}</Text>
          <Text style={[styles.bmiCategory, { color: bmiColor }]}>
            {bmiCategory}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8F8FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#222",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  bmiContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8FF",
    borderRadius: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  bmiLabel: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 42,
    fontWeight: "800",
  },
  bmiCategory: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
});
