import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FloatingCartBarProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onCartPress: () => void;
  onBuyNowPress: () => void;
}

export function FloatingCartBar({
  quantity,
  onIncrease,
  onDecrease,
  onCartPress,
  onBuyNowPress,
}: FloatingCartBarProps) {
  return (
    <View
      className="absolute bottom-6 bg-white rounded-full border border-gray-100 flex-row items-center px-4 py-2.5 gap-4 shadow-lg shadow-black/10"
      style={{
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      {/* Cart Button */}
      <TouchableOpacity
        onPress={onCartPress}
        className="w-12 h-12 rounded-full border border-gray-200 justify-center items-center bg-white shadow-sm"
      >
        <FontAwesome6 name="opencart" size={20} color="#6A7282" />
      </TouchableOpacity>

      {/* Counter selector */}
      <View className="flex-row items-center bg-white rounded-full px-2.5 py-1 border border-gray-200 gap-3">
        <TouchableOpacity
          onPress={onDecrease}
          className="w-7 h-7 rounded-full justify-center items-center shadow-sm"
          style={{ backgroundColor: "#F97316" }}
        >
          <Ionicons name="remove" size={16} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-brand-dark font-bold text-base min-w-[20px] text-center">
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={onIncrease}
          className="w-7 h-7 rounded-full justify-center items-center shadow-sm"
          style={{ backgroundColor: "#F97316" }}
        >
          <Ionicons name="add" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Buy Now Button */}
      <TouchableOpacity
        onPress={onBuyNowPress}
        className="px-6 py-3 rounded-full justify-center items-center shadow-sm"
        style={{ backgroundColor: "#F97316" }}
      >
        <Text className="text-white font-bold text-sm">Buy now</Text>
      </TouchableOpacity>
    </View>
  );
}
