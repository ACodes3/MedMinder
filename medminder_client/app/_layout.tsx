import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Home (default entry screen) */}
      <Stack.Screen name="index" />

      {/* Tabs group (Dashboard + StartScreen) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
