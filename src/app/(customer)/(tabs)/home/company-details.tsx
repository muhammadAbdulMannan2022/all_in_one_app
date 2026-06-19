import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CarItem {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  speed: string;
  transmission: string;
  capacity: string;
  fuel: string;
  description: string;
}

const CAR_MOCK_DATA: Record<string, CarItem[]> = {
  SEDAN: [
    {
      id: "car_s1",
      title: "Toyota Camry 2022",
      category: "SEDAN",
      price: 1200,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600", // Toyota Camry drawing/photo or white sedan
      speed: "220 km/h",
      transmission: "Automatic",
      capacity: "5 Person",
      fuel: "Petrol",
      description: "The Toyota Camry 2022 is a groundbreaking mid-size sedan offering comfort, high-efficiency, and premium safety features. Perfect for business trips and standard family rides.",
    },
    {
      id: "car_s2",
      title: "Tesla Model 3",
      category: "SEDAN",
      price: 900,
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600",
      speed: "250 km/h",
      transmission: "Automatic",
      capacity: "5 Person",
      fuel: "Electric",
      description: "High performance, zero emissions. The Tesla Model 3 offers dual motor all-wheel drive, quick acceleration, and autopilot capabilities for a modern futuristic cruise.",
    },
  ],
  SUV: [
    {
      id: "car_suv1",
      title: "Toyota RAV4 SUV",
      category: "SUV",
      price: 1000,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
      speed: "200 km/h",
      transmission: "Automatic",
      capacity: "5 Person",
      fuel: "Hybrid",
      description: "Equipped with all-wheel drive and robust off-road capability, the Toyota RAV4 is the perfect versatile SUV for city tours and light outdoor adventure.",
    },
    {
      id: "car_suv2",
      title: "Range Rover Sport",
      category: "SUV",
      price: 2500,
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600",
      speed: "260 km/h",
      transmission: "Automatic",
      capacity: "7 Person",
      fuel: "Petrol",
      description: "An exceptional luxury SUV featuring fine leather upholstery, dynamic air suspension, and high-horsepower engine for ultimate comfort on longer road trips.",
    },
  ],
  SPORTS: [
    {
      id: "car_sp1",
      title: "Ford Mustang GT",
      category: "SPORTS",
      price: 1500,
      image: "https://images.unsplash.com/photo-1611245422472-3580556f8f53?w=600",
      speed: "280 km/h",
      transmission: "Manual",
      capacity: "4 Person",
      fuel: "Petrol",
      description: "Unleash American muscle. The Ford Mustang GT offers loud roaring V8 power, precise handling, and sporty aesthetic lines that turn heads at every corner.",
    },
    {
      id: "car_sp2",
      title: "Chevrolet Corvette C8",
      category: "SPORTS",
      price: 3000,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600",
      speed: "310 km/h",
      transmission: "Automatic",
      capacity: "2 Person",
      fuel: "Petrol",
      description: "A mid-engine masterpiece. The Corvette C8 offers supercar performance at rental cost, wrapping comfort inside a high-tech fighter jet cockpit.",
    },
  ],
  LUXURY: [
    {
      id: "car_l1",
      title: "Mercedes S-Class",
      category: "LUXURY",
      price: 2200,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600",
      speed: "250 km/h",
      transmission: "Automatic",
      capacity: "5 Person",
      fuel: "Petrol",
      description: "The pinnacle of executive comfort. The S-Class features ambient cabin lights, custom massagers, noise isolation, and extremely smooth ride quality.",
    },
    {
      id: "car_l2",
      title: "Rolls-Royce Ghost",
      category: "LUXURY",
      price: 5000,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600",
      speed: "250 km/h",
      transmission: "Automatic",
      capacity: "5 Person",
      fuel: "Petrol",
      description: "Experience pure opulence. The Ghost is powered by a twin-turbo V12 engine and floats silently with its state-of-the-art Planar Suspension system.",
    },
  ],
  CONVERTIBLE: [
    {
      id: "car_c1",
      title: "BMW 4 Series Convertible",
      category: "CONVERTIBLE",
      price: 1800,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
      speed: "240 km/h",
      transmission: "Automatic",
      capacity: "4 Person",
      fuel: "Petrol",
      description: "Open-air luxury cruising. Drop the soft top on the BMW 4 Series in seconds to soak in the sun while enjoying premium sporty performance.",
    },
  ],
};

export default function CompanyDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const title = (params.title as string) || "Nexora DriveHub";
  const subtitle = (params.subtitle as string) || "Luxury & Comfort";
  const rating = (params.rating as string) || "4.5";
  const location = (params.location as string) || "Narayanganj";
  const price = (params.price as string) || "From $60/day";
  const image =
    (params.image as string) ||
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("SEDAN");

  const categoriesList = ["SEDAN", "SUV", "SPORTS", "LUXURY", "CONVERTIBLE"];
  const currentCars = CAR_MOCK_DATA[activeCategory] || [];
  
  const filteredCars = currentCars.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCarPress = (car: CarItem) => {
    router.push({
      pathname: "/(customer)/(tabs)/home/car-details" as any,
      params: {
        id: car.id,
        title: car.title,
        price: car.price.toString(),
        category: car.category,
        image: car.image,
        speed: car.speed,
        transmission: car.transmission,
        capacity: car.capacity,
        fuel: car.fuel,
        description: car.description,
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Banner Hero Image */}
        <View className="w-full h-80 relative">
          <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />

          {/* Floating Back Button */}
          <SafeAreaView
            className="absolute top-0 left-0 right-0 z-20 pointer-events-box-none"
            edges={["top"]}
          >
            <View className="flex-row justify-between items-center px-6 mt-4">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-11 h-11 rounded-full items-center justify-center bg-white shadow-md"
              >
                <Ionicons name="chevron-back" size={20} color="#6A7282" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-11 h-11 rounded-full items-center justify-center bg-white shadow-md"
              >
                <Ionicons name="bookmark-outline" size={20} color="#6A7282" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Bottom Dark Gradient Overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 24,
              paddingBottom: 24,
              paddingTop: 80,
              justifyContent: "flex-end",
            }}
          >
            <View className="gap-0.5">
              <Text className="text-white text-2xl font-black">{title}</Text>
              <Text className="text-gray-300 text-xs font-semibold">{subtitle}</Text>
              <View className="flex-row justify-between items-center mt-1.5" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text className="text-[#F97316] text-xs font-extrabold">{price}</Text>
                <View className="flex-row items-center gap-3" style={{ flexDirection: "row", alignItems: "center" }}>
                  <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="location-outline" size={14} color="#D1D5DB" />
                    <Text className="text-gray-300 text-[10px] font-bold">{location}</Text>
                  </View>
                  <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text className="text-white text-[10px] font-black">{rating} (250 Review)</Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Content Wrapper */}
        <View className="px-6 pt-6">
          {/* Search bar inside */}
          <View className="bg-white border border-gray-100 rounded-2xl flex-row items-center px-4 py-3 gap-2.5 shadow-sm mb-5" style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search vehicles"
              placeholderTextColor="#A0AAB9"
              className="flex-1 text-gray-700 text-xs py-0"
            />
          </View>

          {/* Horizontal Category selector */}
          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {categoriesList.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setActiveCategory(cat)}
                    className="pb-2 relative"
                  >
                    <Text
                      className={`text-xs font-black px-1 ${
                        isActive ? "text-[#1F2937]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {cat}
                    </Text>
                    {isActive && (
                      <View className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F97316] rounded-full" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Cars List */}
          <View className="gap-4">
            {filteredCars.map((car) => (
              <TouchableOpacity
                key={car.id}
                onPress={() => handleCarPress(car)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-3 gap-3"
                activeOpacity={0.9}
                style={{ flexDirection: "row" }}
              >
                {/* Vehicle Image */}
                <View className="w-28 h-20 bg-gray-50 rounded-xl overflow-hidden justify-center items-center">
                  <Image source={{ uri: car.image }} className="w-full h-full" resizeMode="cover" />
                </View>

                {/* Info on Right */}
                <View className="flex-1 justify-center gap-1">
                  <Text className="text-brand-dark font-extrabold text-sm">{car.title}</Text>
                  <Text className="text-[#F97316] text-xs font-black">${car.price}/day</Text>
                  
                  {/* Specs footer */}
                  <View className="flex-row items-center gap-3 mt-1" style={{ flexDirection: "row", alignItems: "center" }}>
                    <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                      <Ionicons name="speedometer-outline" size={12} color="#9CA3AF" />
                      <Text className="text-gray-400 text-[9px] font-bold">{car.speed.split(" ")[0]}</Text>
                    </View>
                    <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                      <Ionicons name="cog-outline" size={12} color="#9CA3AF" />
                      <Text className="text-gray-400 text-[9px] font-bold">
                        {car.transmission === "Automatic" ? "A" : "M"}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                      <Ionicons name="people-outline" size={12} color="#9CA3AF" />
                      <Text className="text-gray-400 text-[9px] font-bold">{car.capacity.split(" ")[0]}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
