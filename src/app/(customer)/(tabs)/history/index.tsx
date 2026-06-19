import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// History items data based on mockup
const HISTORY_DATA = [
  {
    id: "h1",
    title: "Sakura Garden",
    type: "food",
    date: "Oct 20, 2026 • 2:30 PM",
    refId: "Order ID : PHU8392",
    status: "Complete",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
    route: "/(customer)/(tabs)/history/order-detail" as const,
    params: { title: "Sakura Garden", type: "food" },
  },
  {
    id: "h2",
    title: "Mobile Store",
    type: "product",
    date: "Oct 20, 2026 • 2:30 PM",
    refId: "Booking ID : PHU8392",
    status: "Complete",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    route: "/(customer)/(tabs)/history/order-detail" as const,
    params: { title: "Mobile Store", type: "product" },
  },
  {
    id: "h3",
    title: "Trip to Narayanganj Sadar",
    type: "rides",
    date: "Oct 20, 2026 • 2:30 PM",
    refId: "Ride ID : PHU8392",
    status: "Complete",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400",
    route: "/(customer)/(tabs)/history/ride-detail" as const,
    params: { title: "Trip to Narayanganj Sadar", type: "rides" },
  },
  {
    id: "h4",
    title: "Toyota Camry 2022",
    type: "rentals",
    date: "Oct 20, 2026 • 2:30 PM",
    refId: "Booking ID : PHU8392",
    status: "Complete",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
    route: "/(customer)/(tabs)/history/booking-detail" as const,
    params: { title: "Toyota Camry 2022", type: "rentals" },
  },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: null },
  { id: "product", label: "Product", icon: "storefront-outline" as const },
  { id: "food", label: "Food", icon: "restaurant-outline" as const },
  { id: "rides", label: "Rides", icon: "car-outline" as const },
  { id: "rentals", label: "Rentals", icon: "car-sport-outline" as const },
];

export default function HistoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filtering logic
  const filteredItems = HISTORY_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.type === activeCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        <Text className="text-[#1F2937] text-lg font-bold">History</Text>

        {/* Spacer to align center */}
        <View className="w-11 h-11" />
      </View>

      {/* Search Input */}
      <View className="px-6 mt-4">
        <View className="flex-row items-center bg-white border border-gray-100 rounded-2xl px-4 py-3 gap-2 shadow-sm shadow-black/[0.02]">
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search activity"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-[#1F2937] text-xs font-semibold p-0"
          />
        </View>
      </View>

      {/* Categories chips horizontal selector */}
      <View className="mt-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                className={`flex-row items-center px-4 py-2.5 rounded-full border gap-1.5 ${
                  isActive
                    ? "bg-[#F97316] border-[#F97316]"
                    : "bg-white border-gray-100"
                }`}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {cat.icon && (
                  <Ionicons
                    name={cat.icon}
                    size={14}
                    color={isActive ? "#FFFFFF" : "#6A7282"}
                  />
                )}
                <Text
                  className={`text-xs font-bold ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* History Items list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 mt-6"
        contentContainerStyle={{ paddingBottom: 120, gap: 16 }}
      >
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: item.route,
                params: item.params,
              })
            }
            className="bg-white rounded-3xl p-3.5 border border-gray-55 shadow-sm flex-row items-center justify-between"
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
          >
            {/* Left Info block */}
            <View className="flex-1 flex-row items-center gap-3.5" style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Product side Image snippet */}
              <View className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Text metadata details */}
              <View className="flex-1 gap-1">
                <Text className="text-[#1F2937] font-bold text-sm">
                  {item.title}
                </Text>
                <Text className="text-[#9CA3AF] text-[10px] font-semibold">
                  {item.date}
                </Text>
                <Text className="text-[#9CA3AF] text-[10px] font-semibold">
                  {item.refId}
                </Text>

                {/* Status indicator */}
                <View 
                  className="flex-row items-center gap-1 bg-[#EEFDF7] border border-[#D1FAE5] px-2 py-0.5 rounded-md self-start mt-1"
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name="checkmark-circle" size={10} color="#10B981" />
                  <Text className="text-[#10B981] text-[9px] font-bold">
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* Right link indicator */}
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
