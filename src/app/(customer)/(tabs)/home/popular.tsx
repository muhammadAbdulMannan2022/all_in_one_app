import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PopularNearYouScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCuisine, setActiveCuisine] = useState("All");

  const cuisines = ["All", "Japanese", "Italian", "Mexican", "Indian"];

  const restaurants = [
    {
      id: "r1",
      title: "Sakura Garden",
      cuisine: "Japanese",
      rating: 4.5,
      time: "25-35 min",
      discount: "20% Off",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
    },
    {
      id: "r2",
      title: "Sakura Garden",
      cuisine: "Japanese",
      rating: 4.5,
      time: "25-35 min",
      discount: "",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    },
    {
      id: "r3",
      title: "Sakura Garden",
      cuisine: "Japanese",
      rating: 4.5,
      time: "25-35 min",
      discount: "20% Off",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
    },
    {
      id: "r4",
      title: "Sakura Garden",
      cuisine: "Japanese",
      rating: 4.5,
      time: "25-35 min",
      discount: "",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    },
    {
      id: "r5",
      title: "Sakura Garden",
      cuisine: "Japanese",
      rating: 4.5,
      time: "25-35 min",
      discount: "20% Off",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
    },
    {
      id: "r6",
      title: "Sakura Garden",
      cuisine: "Japanese",
      rating: 4.5,
      time: "25-35 min",
      discount: "",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    },
  ];

  const handleRestaurantPress = (rest: typeof restaurants[0]) => {
    router.push({
      pathname: "/(customer)/(tabs)/home/restaurant-details" as any,
      params: {
        id: rest.id,
        title: rest.title,
        cuisine: rest.cuisine,
        rating: rest.rating.toString(),
        time: rest.time,
        image: rest.image,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* Header Bar */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2 h-16">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>
        
        <Text className="text-[#1F2937] text-lg font-bold">Popular Near You</Text>
        
        {/* Spacer to align center */}
        <View className="w-11 h-11" />
      </View>

      {/* Search Input and Filter */}
      <View className="px-6 py-3 flex-row gap-3 items-center" style={{ flexDirection: "row", alignItems: "center" }}>
        <View className="flex-1 bg-white border border-gray-100 rounded-2xl flex-row items-center px-4 py-3 gap-2.5 shadow-sm">
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search nearby services"
            placeholderTextColor="#A0AAB9"
            className="flex-1 text-gray-700 text-xs py-0"
          />
        </View>
        <TouchableOpacity className="w-12 h-12 rounded-2xl border border-gray-100 bg-white items-center justify-center shadow-sm">
          <Ionicons name="options-outline" size={20} color="#F97316" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Cuisines filter row */}
      <View className="py-2.5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          {cuisines.map((cuisine) => {
            const isActive = activeCuisine === cuisine;
            return (
              <TouchableOpacity
                key={cuisine}
                onPress={() => setActiveCuisine(cuisine)}
                className={`px-5 py-2.5 rounded-full border ${
                  isActive
                    ? "bg-[#F97316] border-[#F97316]"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {cuisine}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Vertical list of restaurants */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-6 pt-3"
      >
        <Text className="text-[#1F2937] font-bold text-sm mb-3.5 capitalize">
          {activeCuisine}
        </Text>

        <View className="gap-3">
          {restaurants
            .filter((r) => activeCuisine === "All" || r.cuisine === activeCuisine)
            .map((rest, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRestaurantPress(rest)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-row overflow-hidden p-3 gap-3"
                activeOpacity={0.9}
                style={{ flexDirection: "row" }}
              >
                {/* Restaurant Image with Discount Badge */}
                <View className="w-28 h-20 bg-gray-100 rounded-xl overflow-hidden relative">
                  <Image
                    source={{ uri: rest.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {rest.discount ? (
                    <View className="absolute top-1.5 left-1.5 bg-[#F97316] px-1.5 py-0.5 rounded-md">
                      <Text className="text-white text-[8px] font-black">{rest.discount}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Restaurant Info on Right */}
                <View className="flex-1 justify-center gap-1">
                  <Text className="text-brand-dark font-bold text-sm">
                    {rest.title}
                  </Text>
                  <Text className="text-brand-gray text-[10px] font-semibold">
                    {rest.cuisine}
                  </Text>
                  
                  {/* Rating and Time */}
                  <View className="flex-row items-center gap-3 mt-1" style={{ flexDirection: "row", alignItems: "center" }}>
                    <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                      <Ionicons name="star" size={12} color="#FFB800" />
                      <Text className="text-brand-dark text-[10px] font-extrabold">{rest.rating}</Text>
                    </View>
                    <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                      <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                      <Text className="text-brand-gray text-[10px] font-semibold">{rest.time}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
