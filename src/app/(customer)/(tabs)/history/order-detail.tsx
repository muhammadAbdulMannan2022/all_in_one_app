import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = (params.title as string) || "Mobile Store";

  return (
    <View className="flex-1 bg-white relative">
      {/* Floating Back Button */}
      <SafeAreaView
        className="absolute top-0 left-0 right-0 z-20 pointer-events-box-none"
        edges={["top"]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="ml-6 mt-4 w-11 h-11 rounded-full border border-white items-center justify-center bg-white/90 shadow-md pointer-events-auto"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Top Banner Image */}
      <View className="w-full h-56 bg-gray-800 relative">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Shadow Overlay Gradient */}
        <View className="absolute inset-0 bg-black/45 justify-end p-6">
          <Text className="text-white text-2xl font-bold mb-1">{title}</Text>
          <View className="flex-row items-center justify-between" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View className="flex-row items-center gap-1.5" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={14} color="#D1D5DB" />
              <Text className="text-gray-300 text-xs font-semibold">Dhaka</Text>
            </View>
            <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text className="text-white text-xs font-bold">4.5 (250 Review)</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 pt-6"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Placed -> Placed -> Delivered Progress Stepper */}
        <View className="flex-row justify-between items-center px-4 mb-6 relative" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {/* Connector Line */}
          <View className="absolute left-10 right-10 top-3 h-[2.5px] bg-[#10B981] z-0" />

          {/* Step 1 */}
          <View className="items-center z-10">
            <View className="w-6 h-6 rounded-full bg-[#10B981] items-center justify-center border border-white">
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
            <Text className="text-[#10B981] text-[10px] font-bold mt-1.5">Placed</Text>
          </View>

          {/* Step 2 */}
          <View className="items-center z-10">
            <View className="w-6 h-6 rounded-full bg-[#10B981] items-center justify-center border border-white">
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
            <Text className="text-[#10B981] text-[10px] font-bold mt-1.5">Placed</Text>
          </View>

          {/* Step 3 */}
          <View className="items-center z-10">
            <View className="w-6 h-6 rounded-full bg-[#10B981] items-center justify-center border border-white">
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
            <Text className="text-[#10B981] text-[10px] font-bold mt-1.5">Delivered</Text>
          </View>
        </View>

        {/* Item Rows Cards List */}
        <View className="gap-3.5 mb-6">
          {/* Item 1 */}
          <View 
            className="flex-row items-center bg-gray-50 border border-gray-100 rounded-3xl p-3 justify-between"
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
          >
            <View className="flex-row items-center gap-3" style={{ flexDirection: "row", alignItems: "center" }}>
              <View className="w-14 h-14 bg-white border border-gray-100 rounded-2xl overflow-hidden justify-center items-center">
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=100" }}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text className="text-[#1F2937] font-bold text-xs">Smart Watch</Text>
                <Text className="text-gray-400 text-[10px] font-semibold mt-0.5">Color: Black | Size: Medium</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4" style={{ flexDirection: "row", alignItems: "center" }}>
              <Text className="text-gray-400 text-xs font-bold">1x</Text>
              <Text className="text-[#1F2937] text-xs font-extrabold">$12.00</Text>
            </View>
          </View>

          {/* Item 2 */}
          <View 
            className="flex-row items-center bg-gray-50 border border-gray-100 rounded-3xl p-3 justify-between"
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
          >
            <View className="flex-row items-center gap-3" style={{ flexDirection: "row", alignItems: "center" }}>
              <View className="w-14 h-14 bg-white border border-gray-100 rounded-2xl overflow-hidden justify-center items-center">
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" }}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text className="text-[#1F2937] font-bold text-xs">Headphone</Text>
                <Text className="text-gray-400 text-[10px] font-semibold mt-0.5">Color: Black | Size: Medium</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4" style={{ flexDirection: "row", alignItems: "center" }}>
              <Text className="text-gray-400 text-xs font-bold">3x</Text>
              <Text className="text-[#1F2937] text-xs font-extrabold">$5.99</Text>
            </View>
          </View>
        </View>

        {/* Price Summary Breakdown */}
        <Text className="text-[#1F2937] font-bold text-sm mb-3">Price Summary</Text>
        <View className="bg-[#FCFAF9] border border-gray-100 rounded-3xl p-4 mb-6">
          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text className="text-gray-400 text-xs font-semibold">Total Items</Text>
            <Text className="text-[#1F2937] text-xs font-bold">3 Items</Text>
          </View>
          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text className="text-gray-400 text-xs font-semibold">Sub Total</Text>
            <Text className="text-[#1F2937] text-xs font-bold">$29.95</Text>
          </View>
          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text className="text-gray-400 text-xs font-semibold">Delivery Fee</Text>
            <Text className="text-[#10B981] text-xs font-bold font-black">Free</Text>
          </View>
          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text className="text-gray-400 text-xs font-semibold">Tax (8%)</Text>
            <Text className="text-[#1F2937] text-xs font-bold">$0.48</Text>
          </View>
          <View className="flex-row justify-between items-center py-2" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text className="text-gray-400 text-xs font-semibold">Order ID</Text>
            <Text className="text-[#1F2937] text-xs font-bold">#PHU5894</Text>
          </View>

          {/* Dotted border line */}
          <View className="border-b border-dashed border-gray-250 my-2" />

          <View className="flex-row justify-between items-center py-1.5" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text className="text-[#1F2937] text-xs font-bold">Total</Text>
            <Text className="text-[#F97316] text-sm font-black">$30.43</Text>
          </View>
        </View>

        {/* Paid with card details */}
        <View 
          className="bg-white border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center mb-6 shadow-sm shadow-black/[0.01]"
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <View className="flex-row items-center gap-2.5" style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="card-outline" size={20} color="#F97316" />
            <Text className="text-gray-400 text-xs font-bold">Paid with Credit ******45698</Text>
          </View>
          <Text className="text-[#F97316] text-xs font-extrabold">$30.43</Text>
        </View>

        {/* Reorder Button */}
        <TouchableOpacity
          onPress={() => router.push("/(customer)/cart")}
          className="w-full bg-[#F97316] py-4 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-orange-500/20"
          style={{ flexDirection: "row" }}
        >
          <Ionicons name="refresh" size={18} color="#FFFFFF" />
          <Text className="text-white text-base font-bold">Re-Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
