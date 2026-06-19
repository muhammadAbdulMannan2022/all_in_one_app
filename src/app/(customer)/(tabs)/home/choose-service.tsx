import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChooseServiceScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<"ride" | "courier">("ride");

  const handleSelect = (service: "ride" | "courier") => {
    setSelected(service);
    // Navigate to Set Destination screen with service type
    router.push({
      pathname: "/(customer)/(tabs)/home/set-destination",
      params: { service },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* Header bar */}
      <View 
        className="flex-row items-center justify-between px-6 pt-4 pb-2 h-16"
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>

        <Text className="text-[#1F2937] text-lg font-bold">Choose Service</Text>

        {/* Spacer to align center */}
        <View className="w-11 h-11" />
      </View>

      {/* Service Cards Container */}
      <View className="px-6 pt-8 gap-6">
        {/* Request a Ride Card */}
        <TouchableOpacity
          onPress={() => handleSelect("ride")}
          activeOpacity={0.9}
          className={`bg-white rounded-3xl p-5 border flex-row items-center justify-between shadow-sm ${
            selected === "ride" ? "border-[#F97316]" : "border-gray-100"
          }`}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <View className="flex-1 pr-4">
            <Text className="text-[#1F2937] text-base font-bold mb-1">
              Request a Ride
            </Text>
            <Text className="text-[#9CA3AF] text-[11px] font-semibold leading-4">
              Book a comfortable ride to your destination
            </Text>
          </View>
          <View className="w-28 h-20 bg-gray-50 rounded-2xl overflow-hidden items-center justify-center">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        {/* Courier & Parcel Card */}
        <TouchableOpacity
          onPress={() => handleSelect("courier")}
          activeOpacity={0.9}
          className={`bg-white rounded-3xl p-5 border flex-row items-center justify-between shadow-sm ${
            selected === "courier" ? "border-[#F97316]" : "border-gray-100"
          }`}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <View className="flex-1 pr-4">
            <Text className="text-[#1F2937] text-base font-bold mb-1">
              Courier & Parcel
            </Text>
            <Text className="text-[#9CA3AF] text-[11px] font-semibold leading-4">
              Send parcels securely to any location
            </Text>
          </View>
          <View className="w-28 h-20 bg-gray-50 rounded-2xl overflow-hidden items-center justify-center">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1566576912321-d58ded7a215f?w=300",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
