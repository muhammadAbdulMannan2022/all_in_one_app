import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export function TrackRecentActivity() {
  return (
    <View className="gap-3">
      {/* Edamame */}
      <View
        className="bg-white rounded-2xl p-3 border border-gray-100 flex-row items-center justify-between"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          className="flex-row items-center gap-3"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=120",
            }}
            className="w-12 h-12 rounded-2xl"
          />
          <View>
            <Text className="text-[#1F2937] font-bold text-xs">
              Edamame
            </Text>
            <Text className="text-[#9CA3AF] text-[9px] font-medium mt-0.5">
              2 days ago
            </Text>
          </View>
        </View>
        <View className="bg-[#ECFDF5] px-2.5 py-1 rounded-full">
          <Text className="text-[#059669] text-[9px] font-bold">
            Delivered
          </Text>
        </View>
      </View>

      {/* BMW X5 */}
      <View
        className="bg-white rounded-2xl p-3 border border-gray-100 flex-row items-center justify-between"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          className="flex-row items-center gap-3"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View className="w-12 h-12 rounded-2xl bg-[#FFF7ED] items-center justify-center">
            <Ionicons name="car-sport" size={22} color="#F97316" />
          </View>
          <View>
            <Text className="text-[#1F2937] font-bold text-xs">
              BMW X5 Rental
            </Text>
            <Text className="text-[#9CA3AF] text-[9px] font-medium mt-0.5">
              2 days ago
            </Text>
          </View>
        </View>
        <View className="bg-[#ECFDF5] px-2.5 py-1 rounded-full">
          <Text className="text-[#059669] text-[9px] font-bold">
            Delivered
          </Text>
        </View>
      </View>
    </View>
  );
}
