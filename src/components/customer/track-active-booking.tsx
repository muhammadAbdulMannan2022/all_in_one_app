import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface TrackActiveBookingProps {
  onViewDetails: () => void;
}

export function TrackActiveBooking({ onViewDetails }: TrackActiveBookingProps) {
  return (
    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md mb-6">
      {/* Car image card details */}
      <View className="items-center justify-center py-2 bg-gray-50 rounded-2xl mb-4">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600",
          }}
          className="w-48 h-28"
          resizeMode="contain"
        />
      </View>

      <View className="flex-row justify-between items-start mb-1" style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View className="flex-1 mr-4">
          <Text className="text-[#1F2937] font-extrabold text-base">
            Toyota Camry 2022
          </Text>
          {/* Specs row */}
          <View className="flex-row items-center gap-2.5 mt-1.5" style={{ flexDirection: "row", alignItems: "center" }}>
            <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="speedometer-outline" size={12} color="#9CA3AF" />
              <Text className="text-gray-400 text-[10px] font-bold">12.5</Text>
            </View>
            <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="cog-outline" size={12} color="#9CA3AF" />
              <Text className="text-gray-400 text-[10px] font-bold">A</Text>
            </View>
            <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="people-outline" size={12} color="#9CA3AF" />
              <Text className="text-gray-400 text-[10px] font-bold">7</Text>
            </View>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-[#F97316] font-black text-base">$1200<Text className="text-gray-400 text-[9px] font-bold">/day</Text></Text>
          <View className="flex-row items-center gap-1 mt-1.5" style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="calendar-outline" size={12} color="#6A7282" />
            <Text className="text-brand-dark text-[10px] font-bold">Oct 12 - Oct 15</Text>
          </View>
        </View>
      </View>

      {/* Status Tracking Flow */}
      <View className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 mt-4 gap-3">
        <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text className="text-[#6A7282] text-[10px] font-bold">Status</Text>
          <View className="bg-[#EBFDF5] px-2 py-0.5 rounded-full flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="checkmark-circle" size={10} color="#10B981" />
            <Text className="text-[#10B981] text-[8px] font-extrabold">Active</Text>
          </View>
        </View>

        {/* Progress Stepper bar */}
        <View className="flex-row items-center justify-between px-3 py-1 mt-1 relative" style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Horizontal connector lines */}
          <View className="absolute left-8 right-8 top-5 h-[2px] bg-gray-100" />
          <View className="absolute left-8 w-[40%] top-5 h-[2px] bg-[#F97316]" />

          {/* Step 1: Booked */}
          <View className="items-center z-10 w-[24%]">
            <View className="w-8 h-8 rounded-full bg-[#F97316] items-center justify-center shadow-sm">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text className="text-brand-dark text-[8px] font-black mt-1.5 text-center">Booked</Text>
          </View>

          {/* Step 2: Ready for Pickup */}
          <View className="items-center z-10 w-[24%]">
            <View className="w-8 h-8 rounded-full bg-[#F3F4F6] items-center justify-center border border-gray-100 shadow-sm">
              <Ionicons name="car-outline" size={14} color="#9CA3AF" />
            </View>
            <Text className="text-gray-400 text-[8px] font-bold mt-1.5 text-center">Ready for Pickup</Text>
          </View>

          {/* Step 3: Returned */}
          <View className="items-center z-10 w-[24%]">
            <View className="w-8 h-8 rounded-full bg-[#F3F4F6] items-center justify-center border border-gray-100 shadow-sm">
              <Ionicons name="flag-outline" size={14} color="#9CA3AF" />
            </View>
            <Text className="text-gray-400 text-[8px] font-bold mt-1.5 text-center">Returned</Text>
          </View>
        </View>
      </View>

      {/* View Details Button */}
      <TouchableOpacity
        onPress={onViewDetails}
        className="w-full py-3.5 rounded-2xl border border-[#F97316] bg-white items-center justify-center mt-5"
      >
        <Text className="text-[#F97316] font-bold text-xs">View Details</Text>
      </TouchableOpacity>
    </View>
  );
}
