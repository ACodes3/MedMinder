import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


const StartScreen: React.FC = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/gradient-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Glassmorphism Card */}
      <BlurView intensity={70} tint="light" style={styles.glassContainer}>
        {/* Foreground Illustration */}
        <Image
          source={require("../assets/images/pill-clock.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Text Section */}
        <Text style={styles.title}>We take care of your regular medication</Text>
        <Text style={styles.subtitle}>
          Keep yourself and loved ones safe and never forget to take your meds,
          supplements and vitamins.
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/DashboardScreen")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </BlurView>
    </ImageBackground>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  glassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  illustration: {
    width: 400,
    height: 250,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1e1e1e",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 35,
  },
  button: {
    backgroundColor: "#ca2d9eff",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#5A31F4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d3d3d3",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#ca2d9eff",
    width: 16,
  },
});
