import { TrackActiveBooking } from "@/components/customer/track-active-booking";
import { TrackActiveOrder } from "@/components/customer/track-active-order";
import { TrackActiveRide } from "@/components/customer/track-active-ride";

import { TrackEmptyState } from "@/components/customer/track-empty-state";
import { TrackRecentActivity } from "@/components/customer/track-recent-activity";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isCancelled = params?.cancelled === "true";

  // Tab selections: All Activities, Bookings, Orders, Ride
  const [activeTab, setActiveTab] = useState("Orders");

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* Header bar */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2 h-16">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>

        <Text className="text-[#1F2937] text-lg font-bold">Live Track</Text>

        <TouchableOpacity
          onPress={() => router.push("/(customer)/notifications")}
          className="w-11 h-11 items-center justify-center relative"
        >
          <Ionicons name="notifications-outline" size={22} color="#6A7282" />
          <View className="absolute top-1.5 right-1.5 bg-[#F97316] w-4 h-4 rounded-full items-center justify-center">
            <Text className="text-white text-[9px] font-bold">1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs Selection */}
      <View className="flex-row justify-between border-b border-gray-100 px-6 mt-2">
        {["All Activities", "Bookings", "Orders", "Ride"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="pb-3 relative flex-1 items-center"
            >
              <Text
                className={`text-xs ${isActive ? "text-[#1F2937] font-bold" : "text-[#9CA3AF] font-medium"}`}
              >
                {tab}
              </Text>
              {isActive && (
                <View className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#F97316] rounded-full" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Main Content */}
      {activeTab === "All Activities" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
          className="px-6 pt-6"
        >
          {/* Active Booking Section */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Active Booking
          </Text>

          <TrackActiveBooking
            onViewDetails={() =>
              router.push("/(customer)/(tabs)/track/booking-detail")
            }
          />

          {/* Active Order Card */}
          <Text className="text-[#1F2937] text-sm font-bold mt-6 mb-3">
            Active Order
          </Text>

          <TrackActiveOrder
            onCancel={() =>
              router.push("/(customer)/(tabs)/track/cancel-order")
            }
            onTrack={() => router.push("/(customer)/(tabs)/track/order-detail")}
          />

          {/* Active Ride Section */}
          <Text className="text-[#1F2937] text-sm font-bold mt-6 mb-3">
            Active Ride
          </Text>

          <TrackActiveRide
            onCancel={() =>
              router.push("/(customer)/(tabs)/track/cancel-order")
            }
            onLiveTrack={() =>
              router.push("/(customer)/(tabs)/track/ride-detail")
            }
          />

          {/* Recent Activity Section */}
          <Text className="text-[#1F2937] text-sm font-bold mt-6 mb-3">
            Recent Activity
          </Text>

          <TrackRecentActivity />
        </ScrollView>
      ) : activeTab === "Bookings" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
          className="px-6 pt-6"
        >
          {/* Active Booking Section */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Active Booking
          </Text>

          <TrackActiveBooking
            onViewDetails={() =>
              router.push("/(customer)/(tabs)/track/booking-detail")
            }
          />

          {/* Recent Activity Section */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Recent Activity
          </Text>

          <TrackRecentActivity />
        </ScrollView>
      ) : activeTab === "Orders" && !isCancelled ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
          className="px-6 pt-6"
        >
          {/* Active Order Card */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Active Order
          </Text>

          <TrackActiveOrder
            onCancel={() =>
              router.push("/(customer)/(tabs)/track/cancel-order")
            }
            onTrack={() => router.push("/(customer)/(tabs)/track/order-detail")}
          />

          {/* Recent Activity Section */}
          <Text className="text-[#1F2937] text-sm font-bold mt-6 mb-3">
            Recent Activity
          </Text>

          <TrackRecentActivity />
        </ScrollView>
      ) : activeTab === "Ride" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
          className="px-6 pt-6"
        >
          {/* Active Ride Section */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Active Ride
          </Text>

          <TrackActiveRide
            onCancel={() =>
              router.push("/(customer)/(tabs)/track/cancel-order")
            }
            onLiveTrack={() =>
              router.push("/(customer)/(tabs)/track/ride-detail")
            }
          />

          {/* Recent Activity Section */}
          <Text className="text-[#1F2937] text-sm font-bold mt-6 mb-3">
            Recent Activity
          </Text>

          <TrackRecentActivity />
        </ScrollView>
      ) : (
        <TrackEmptyState
          onBrowsePress={() => router.push("/(customer)/(tabs)/home")}
        />
      )}
    </SafeAreaView>
  );
}
