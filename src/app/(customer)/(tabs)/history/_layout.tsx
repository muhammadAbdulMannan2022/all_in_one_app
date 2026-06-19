import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="order-detail" />
      <Stack.Screen name="ride-detail" />
      <Stack.Screen name="booking-detail" />
    </Stack>
  );
}
