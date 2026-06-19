import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface TrackEmptyStateProps {
  onBrowsePress: () => void;
}

export function TrackEmptyState({ onBrowsePress }: TrackEmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-20">
      <Image
        source={require("@/assets/illustrations/notOrder.png")}
        className="w-64 h-64 mb-5"
        resizeMode="contain"
      />
      <Text className="text-[#1F2937] font-bold text-lg mb-2">
        No Active Orders
      </Text>
      <Text className="text-[#9CA3AF] text-center text-xs leading-5 px-6 mb-8 font-medium">
        Your active orders, rides and car rentals will appear here for
        real-time tracking
      </Text>
      <TouchableOpacity
        onPress={onBrowsePress}
        className="w-full py-4 rounded-2xl items-center justify-center shadow-lg shadow-[#F97316]/10"
        style={{ backgroundColor: "#F97316" }}
      >
        <Text className="text-white font-bold text-sm">Brows Now</Text>
      </TouchableOpacity>
    </View>
  );
}
