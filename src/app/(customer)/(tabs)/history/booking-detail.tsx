import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* Header bar */}
      <View 
        className="flex-row items-center justify-between px-6 pb-2 h-16 bg-white"
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>

        <Text className="text-[#1F2937] text-lg font-bold">Booking Details</Text>

        <View className="w-11 h-11" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Car Illustration Card */}
        <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-5 shadow-sm">
          <View className="w-full h-44 bg-gray-50 rounded-2xl overflow-hidden justify-center items-center mb-4">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Car Metadata Title and ID */}
          <View 
            className="flex-row justify-between items-center mb-3"
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <Text className="text-[#1F2937] font-extrabold text-base">
              Toyota Camry 2022
            </Text>
            <Text className="text-gray-400 text-[10px] font-bold">
              Booking ID #REN9921
            </Text>
          </View>

          {/* Specs icons line (SUV, Gas, Auto, 7 Seats) */}
          <View className="flex-row gap-3 mt-1.5" style={{ flexDirection: "row" }}>
            <View className="flex-row items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="car-sport" size={13} color="#F97316" />
              <Text className="text-[#1F2937] text-[10px] font-bold">SUV</Text>
            </View>
            <View className="flex-row items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="leaf" size={13} color="#F97316" />
              <Text className="text-[#1F2937] text-[10px] font-bold">12.5</Text>
            </View>
            <View className="flex-row items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="settings" size={13} color="#F97316" />
              <Text className="text-[#1F2937] text-[10px] font-bold">A</Text>
            </View>
            <View className="flex-row items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="people" size={13} color="#F97316" />
              <Text className="text-[#1F2937] text-[10px] font-bold">7</Text>
            </View>
          </View>
        </View>

        {/* Pickup & Dropoff Columns Card */}
        <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-5 shadow-sm flex-row justify-between">
          {/* Pickup */}
          <View className="flex-1 pr-3 border-r border-gray-100">
            <View className="flex-row items-center gap-1.5 mb-3" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="car" size={15} color="#F97316" />
              <Text className="text-[#1F2937] font-bold text-xs">Pick Up</Text>
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="calendar-outline" size={12} color="#9CA3AF" />
                <Text className="text-gray-500 text-[10px] font-semibold">Oct 12, 2026</Text>
              </View>
              <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                <Text className="text-gray-500 text-[10px] font-semibold">10:00 AM</Text>
              </View>
              <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="location-outline" size={12} color="#9CA3AF" />
                <Text className="text-gray-500 text-[10px] font-semibold">Narayanganj Sadar</Text>
              </View>
            </View>
          </View>

          {/* Dropoff */}
          <View className="flex-1 pl-4">
            <View className="flex-row items-center gap-1.5 mb-3" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="car" size={15} color="#F97316" />
              <Text className="text-[#1F2937] font-bold text-xs">Drop Off</Text>
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="calendar-outline" size={12} color="#9CA3AF" />
                <Text className="text-gray-500 text-[10px] font-semibold">Oct 15, 2026</Text>
              </View>
              <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                <Text className="text-gray-500 text-[10px] font-semibold">10:00 AM</Text>
              </View>
              <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="location-outline" size={12} color="#9CA3AF" />
                <Text className="text-gray-500 text-[10px] font-semibold">Narayanganj Sadar</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Price Summary Breakdown Card */}
        <Text className="text-[#1F2937] font-bold text-sm mb-3">Price Summary</Text>
        <View className="bg-[#FCFAF9] border border-gray-100 rounded-3xl p-5 mb-5 shadow-sm">
          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View className="flex-row items-center gap-2" style={{ flexDirection: "row", alignItems: "center" }}>
              <View className="w-7 h-7 rounded-lg bg-[#FFF7ED] items-center justify-center">
                <Ionicons name="pricetag" size={14} color="#F97316" />
              </View>
              <View>
                <Text className="text-gray-500 text-xs font-semibold">Rental Charge</Text>
                <Text className="text-gray-400 text-[9px] font-medium">$1200 * 3 Days</Text>
              </View>
            </View>
            <Text className="text-[#1F2937] text-xs font-bold">$3600.00</Text>
          </View>

          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View className="flex-row items-center gap-2" style={{ flexDirection: "row", alignItems: "center" }}>
              <View className="w-7 h-7 rounded-lg bg-[#FFF7ED] items-center justify-center">
                <Ionicons name="shield-checkmark" size={14} color="#F97316" />
              </View>
              <Text className="text-gray-500 text-xs font-semibold">Insurance Fee</Text>
            </View>
            <Text className="text-[#1F2937] text-xs font-bold">$50.00</Text>
          </View>

          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View className="flex-row items-center gap-2" style={{ flexDirection: "row", alignItems: "center" }}>
              <View className="w-7 h-7 rounded-lg bg-[#FFF7ED] items-center justify-center">
                <Ionicons name="receipt" size={14} color="#F97316" />
              </View>
              <Text className="text-gray-500 text-xs font-semibold">Taxes & Fees</Text>
            </View>
            <Text className="text-[#1F2937] text-xs font-bold">$36.00</Text>
          </View>

          {/* Dotted separator */}
          <View className="border-b border-dashed border-gray-250 my-2.5" />

          <View className="flex-row justify-between items-center py-1.5" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text className="text-[#1F2937] text-xs font-bold">Total</Text>
            <Text className="text-[#F97316] text-base font-black">$3686.00</Text>
          </View>
        </View>

        {/* Paid Card details banner */}
        <View 
          className="bg-white border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center shadow-sm shadow-black/[0.01] mb-6"
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <View className="flex-row items-center gap-2.5" style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="card-outline" size={20} color="#F97316" />
            <Text className="text-gray-400 text-xs font-bold">Paid with Credit ******45698</Text>
          </View>
          <Text className="text-[#F97316] text-xs font-extrabold">$3686.00</Text>
        </View>

        {/* Rent Again Button */}
        <TouchableOpacity
          onPress={() => router.push("/(customer)/(tabs)/home")}
          className="w-full bg-[#F97316] py-4 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-orange-500/20"
          style={{ flexDirection: "row" }}
        >
          <Ionicons name="refresh" size={18} color="#FFFFFF" />
          <Text className="text-white text-base font-bold">Rent Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
