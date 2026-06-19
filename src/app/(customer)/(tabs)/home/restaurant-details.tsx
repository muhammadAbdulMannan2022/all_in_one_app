import { FoodItem, FoodItemCard } from "@/components/customer/food-item-card";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve parameters
  const title = (params.title as string) || "Sakura Garden";
  const cuisine = (params.cuisine as string) || "Japanese";
  const rating = (params.rating as string) || "4.5";
  const time = (params.time as string) || "25-35 min";
  const bannerImage =
    (params.image as string) ||
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600";

  const [activeCategory, setActiveCategory] = useState("All");

  const bestOffers = [
    {
      id: "f1",
      title: "Sunset Pizza",
      price: 5.99,
      rating: 4.5,
      time: "25-35 min",
      discount: "20% Off",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300",
    },
    {
      id: "f2",
      title: "Mountain BBQ Burger",
      price: 5.99,
      rating: 4.5,
      time: "25-35 min",
      discount: "20% Off",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
    },
  ];

  const bestSelling = [
    {
      id: "f3",
      title: "Harvest Moon",
      price: 5.99,
      rating: 4.5,
      time: "25-35 min",
      discount: "",
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300", // sandwich image
    },
    {
      id: "f4",
      title: "Velvet Shake",
      price: 5.99,
      rating: 4.5,
      time: "25-35 min",
      discount: "",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300", // shake image
    },
  ];

  const handleProductPress = (prod: FoodItem) => {
    router.push({
      pathname: "/(customer)/(tabs)/home/product-details" as any,
      params: {
        id: prod.id,
        title: prod.title,
        price: prod.price.toString(),
        rating: prod.rating.toString(),
        image: prod.image,
        service: "restaurant",
      },
    });
  };

  const handleAddToCart = (prod: FoodItem) => {
    console.log("Added food item to cart:", prod.id);
    router.push({
      pathname: "/(customer)/cart",
      params: { service: "restaurant" },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Floating Back Button */}
        <SafeAreaView
          className="absolute top-0 left-0 right-0 z-20 pointer-events-box-none"
          edges={["top"]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="ml-6  mt-4 w-11 h-11 rounded-full items-center justify-center bg-white shadow-md"
          >
            <Ionicons name="chevron-back" size={20} color="#6A7282" />
          </TouchableOpacity>
        </SafeAreaView>
        {/* Banner image wrapper */}
        <View className="w-full h-80 relative">
          <Image
            source={{ uri: bannerImage }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Bottom Dark Gradient Text Overlay */}
          <LinearGradient
            colors={["transparent", "rgb(0, 0, 0)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 24,
              paddingBottom: 24,
              paddingTop: 80,
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {/* Title & Rating */}
            <View
              className="flex-row justify-between items-end mb-1"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text className="text-white text-2xl font-black">{title}</Text>
              <View
                className="flex-row items-center gap-1 mb-1.5"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Ionicons name="star" size={14} color="#FFB800" />
                <Text className="text-white text-xs font-black">{rating}</Text>
                <Text className="text-gray-300 text-[10px] font-semibold">
                  (250 Review)
                </Text>
              </View>
            </View>

            {/* Cuisine & Time */}
            <View
              className="flex-row justify-between items-center"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text className="text-gray-300 text-xs font-bold">{cuisine}</Text>
              <View
                className="flex-row items-center gap-1"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Ionicons name="time" size={14} color="#E5E7EB" />
                <Text className="text-gray-300 text-[10px] font-bold">
                  {time}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Categories and Menu Items List */}
        <View className="px-6 pt-6 bg-white">
          {/* Menu Categories selection bar */}
          <View className="flex-row justify-between border-b border-gray-100 mb-6">
            {["All", "Burger", "sandwich", "Pizza", "Dessert"].map(
              (category) => {
                const isActive = category === activeCategory;
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setActiveCategory(category)}
                    className="pb-3 relative flex-1 items-center"
                  >
                    <Text
                      className={`text-xs ${
                        isActive
                          ? "text-[#1F2937] font-bold"
                          : "text-[#9CA3AF] font-medium"
                      }`}
                    >
                      {category}
                    </Text>
                    {isActive && (
                      <View className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#F97316] rounded-full" />
                    )}
                  </TouchableOpacity>
                );
              },
            )}
          </View>

          {/* Best Offer Section */}
          <Text className="text-[#1F2937] font-bold text-sm mb-3.5">
            Best Offer
          </Text>
          <View
            className="flex-row gap-3 mb-6"
            style={{ flexDirection: "row" }}
          >
            {bestOffers.map((prod) => (
              <FoodItemCard
                key={prod.id}
                item={prod}
                onPress={handleProductPress}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>

          {/* Best Selling Section */}
          <Text className="text-[#1F2937] font-bold text-sm mb-3.5">
            Best Selling
          </Text>
          <View className="flex-row gap-3" style={{ flexDirection: "row" }}>
            {bestSelling.map((prod) => (
              <FoodItemCard
                key={prod.id}
                item={prod}
                onPress={handleProductPress}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
