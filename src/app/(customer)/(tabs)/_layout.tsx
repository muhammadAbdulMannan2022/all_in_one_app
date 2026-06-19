import CustomerTabBar from "@/components/customer/customer-tab-bar";
import { Tabs, useSegments } from "expo-router";

export default function TabsLayout() {
  const segments = useSegments();

  const shouldHideTabBar =
    segments.includes("product-details" as never) ||
    segments.includes("rating-reviews" as never) ||
    segments.includes("order-detail" as never) ||
    segments.includes("cancel-order" as never) ||
    segments.includes("restaurant-details" as never) ||
    segments.includes("popular" as never) ||
    segments.includes("company-details" as never) ||
    segments.includes("car-details" as never) ||
    segments.includes("select-date" as never) ||
    segments.includes("booking-summary" as never) ||
    segments.includes("booking-detail" as never);

  return (
    <Tabs
      tabBar={(props) =>
        !shouldHideTabBar ? <CustomerTabBar {...(props as any)} /> : null
      }
      screenOptions={{
        headerShown: false,
        // Hide the native layout container wrapper entirely
        tabBarStyle: shouldHideTabBar
          ? { display: "none" }
          : { display: "flex" },
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="track" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
