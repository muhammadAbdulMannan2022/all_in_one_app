import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="product-details" />
      <Stack.Screen name="rating-reviews" />
      <Stack.Screen name="restaurant-details" />
      <Stack.Screen name="popular" />
      <Stack.Screen name="company-details" />
      <Stack.Screen name="car-details" />
      <Stack.Screen name="select-date" />
      <Stack.Screen name="booking-summary" />
    </Stack>
  );
}
