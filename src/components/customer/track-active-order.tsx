import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface TrackActiveOrderProps {
  onCancel: () => void;
  onTrack: () => void;
  mapHtml: string;
}

export function TrackActiveOrder({ onCancel, onTrack, mapHtml }: TrackActiveOrderProps) {
  return (
    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md">
      {/* Restaurant header */}
      <View
        className="flex-row items-center gap-3 mb-4"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View className="w-11 h-11 rounded-xl bg-[#FFF7ED] items-center justify-center">
          <Ionicons name="restaurant" size={20} color="#F97316" />
        </View>
        <View>
          <Text className="text-[#1F2937] font-bold text-sm">
            Sakura Garden
          </Text>
          <Text className="text-[#9CA3AF] text-[10px] mt-0.5 font-medium">
            Japanese
          </Text>
        </View>
      </View>

      {/* Leaflet OpenStreetMap WebView */}
      <View className="h-48 rounded-2xl overflow-hidden mb-4 border border-gray-100 bg-[#E5E7EB]">
        <WebView
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={false}
          style={{ flex: 1 }}
        />
      </View>

      {/* Order total info banner */}
      <View
        className="bg-[#FCFAF9] rounded-2xl p-4 flex-row justify-between items-center mb-5"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text className="text-[#6A7282] font-semibold text-xs">
          Your Order is Processing
        </Text>
        <View className="items-end">
          <Text className="text-[#F97316] font-bold text-base">
            $30.43
          </Text>
          <Text className="text-[#9CA3AF] text-[9px] font-medium mt-0.5">
            Total amount
          </Text>
        </View>
      </View>

      {/* Cancel / Track Buttons */}
      <View className="flex-row gap-3" style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onCancel}
          className="flex-1 py-3.5 rounded-2xl border border-gray-200 bg-white items-center justify-center"
        >
          <Text className="text-gray-500 font-bold text-xs">
            Cancel Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onTrack}
          className="flex-1 py-3.5 rounded-2xl border border-[#F97316] bg-white items-center justify-center"
        >
          <Text className="text-[#F97316] font-bold text-xs">
            Track Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
