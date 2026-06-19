import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomerCategories } from "@/components/customer/customer-categories";
import { CustomerFilterModal } from "@/components/customer/customer-filter-modal";
import { CustomerHeader } from "@/components/customer/customer-header";
import { CustomerProducts } from "@/components/customer/customer-products";
import { CustomerPromoBanner } from "@/components/customer/customer-promo-banner";
import { CustomerSearchBar } from "@/components/customer/customer-search-bar";
import { CustomerServiceSelector } from "@/components/customer/customer-service-selector";

// Dynamic data mapping for categories and products by service
const SERVICE_DATA = {
  products: {
    categories: [
      {
        id: "electronic",
        title: "Electronic",
        icon: "phone-portrait-outline" as const,
      },
      { id: "clothing", title: "Clothing", icon: "shirt-outline" as const },
      { id: "grocery", title: "Grocery", icon: "basket-outline" as const },
      { id: "cosmetic", title: "Cosmetic", icon: "sparkles-outline" as const },
      { id: "pharmacy", title: "Pharmacy", icon: "medical-outline" as const },
    ],
    products: [
      {
        id: "p1",
        title: "Sneakers",
        price: 120,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      },
      {
        id: "p2",
        title: "Smart Watch",
        price: 199,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400",
      },
      {
        id: "p3",
        title: "Headphones",
        price: 89,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      },
    ],
  },
  restaurant: {
    categories: [
      { id: "japanese", title: "Japanese", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=150" },
      { id: "italian", title: "Italian", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150" },
      { id: "mexican", title: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=150" },
      { id: "bangali", title: "Bangali", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150" },
      { id: "indian", title: "Indian", image: "https://images.unsplash.com/photo-1585938338392-50a59970d8ee?w=150" },
    ],
    products: [
      {
        id: "r1",
        title: "Sakura Garden",
        cuisine: "Japanese",
        price: 0,
        rating: 4.5,
        time: "25-35 min",
        discount: "20% Off",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
      },
      {
        id: "r2",
        title: "Sakura Garden",
        cuisine: "Japanese",
        price: 0,
        rating: 4.5,
        time: "25-35 min",
        discount: "",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      },
      {
        id: "r3",
        title: "Sakura Garden",
        cuisine: "Japanese",
        price: 0,
        rating: 4.5,
        time: "25-35 min",
        discount: "20% Off",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
      },
    ],
  },
  "car-rent": {
    categories: [
      { id: "sedan", title: "Sedan", icon: "car-sport-outline" as const },
      { id: "suv", title: "SUV", icon: "car-outline" as const },
      { id: "luxury", title: "Luxury", icon: "ribbon-outline" as const },
      { id: "electric", title: "Electric", icon: "flash-outline" as const },
      { id: "van", title: "Van", icon: "bus-outline" as const },
    ],
    products: [
      {
        id: "c1",
        title: "Tesla Model Y",
        price: 85,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400",
      },
      {
        id: "c2",
        title: "Toyota RAV4 SUV",
        price: 60,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400",
      },
      {
        id: "c3",
        title: "Ford Mustang GT",
        price: 110,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1611245422472-3580556f8f53?w=400",
      },
    ],
  },
  "get-ride": {
    categories: [
      { id: "economy", title: "Economy", icon: "cash-outline" as const },
      { id: "comfort", title: "Comfort", icon: "sparkles-outline" as const },
      { id: "luxury", title: "Premium", icon: "star-outline" as const },
      { id: "moto", title: "Moto Ride", icon: "bicycle-outline" as const },
      { id: "bike", title: "Bicycle", icon: "walk-outline" as const },
    ],
    products: [
      {
        id: "g1",
        title: "Standard Ride",
        price: 8,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1492664738988-2be91080becd?w=400",
      },
      {
        id: "g2",
        title: "Comfort Ride",
        price: 15,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400",
      },
      {
        id: "g3",
        title: "Instant Moto",
        price: 5,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400",
      },
    ],
  },
};

export default function CustomerHomeScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<
    "products" | "restaurant" | "car-rent" | "get-ride"
  >("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("high-to-low");
  const [selectedCategory, setSelectedCategory] = useState("electronic");
  const [assets] = useAssets([require("@/assets/banner.png")]);

  // Handle service change and set default sub-category automatically
  const handleSelectService = (serviceId: string) => {
    const service = serviceId as
      | "products"
      | "restaurant"
      | "car-rent"
      | "get-ride";
    setSelectedService(service);
    const defaultCat = SERVICE_DATA[service].categories[0].id;
    setSelectedCategory(defaultCat);
  };

  const currentServiceData = SERVICE_DATA[selectedService];

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Scroll View to cover entire screen content except floating bottom tab bar */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }} // Leave padding for the floating bottom tab bar
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header & Logo */}
        <CustomerHeader
          name="Rahim Rehman"
          cartCount={1}
          notificationCount={1}
          selectedService={selectedService}
          onCartPress={() =>
            router.push({
              pathname: "/(customer)/cart",
              params: { service: selectedService },
            })
          }
          onNotificationPress={() => console.log("Notifications pressed")}
        />

        {/* Top categories selection slider (Products, Restaurant, Car Rent, Get a ride) */}
        <CustomerServiceSelector
          selectedService={selectedService}
          onSelectService={handleSelectService}
        />

        {/* Search & Filter Bar */}
        <CustomerSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onFilterPress={() => setIsFilterVisible(true)}
        />

        {/* Promos Banner */}
        {selectedService !== "car-rent" && (
          <CustomerPromoBanner bannerUri={assets?.[0]?.localUri ?? undefined} />
        )}

        {/* Categories Row (dynamic based on selected service) */}
        {selectedService !== "car-rent" && (
          <CustomerCategories
            categories={currentServiceData.categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {/* Featured Products Grid or Restaurant list or Car Rental list (dynamic based on selected service) */}
        {selectedService === "restaurant" ? (
          <View className="px-6 pt-4">
            <View className="flex-row justify-between items-center mb-3.5" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text className="text-brand-dark text-lg font-bold capitalize">
                {currentServiceData.categories.find((c) => c.id === selectedCategory)?.title ?? "Japanese"}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(customer)/(tabs)/home/popular" as any)}>
                <Text className="text-[#F97316] text-xs font-bold">View All</Text>
              </TouchableOpacity>
            </View>

            {/* Vertical list of restaurants */}
            <View className="gap-3">
              {(currentServiceData.products as any[]).map((rest) => (
                <TouchableOpacity
                  key={rest.id}
                  onPress={() =>
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
                    })
                  }
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
          </View>
        ) : selectedService === "car-rent" ? (
          <View className="px-6 pt-4">
            <Text className="text-brand-dark text-lg font-bold mb-3.5">
              Popular Company Nearby
            </Text>
            <View className="gap-4">
              {[
                {
                  id: "comp1",
                  title: "Bahamas Rides",
                  subtitle: "Premium Car Rentals",
                  rating: 4.5,
                  location: "Narayanganj",
                  price: "From $60/day",
                  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
                },
                {
                  id: "comp2",
                  title: "Nexora DriveHub",
                  subtitle: "Luxury & Comfort",
                  rating: 4.5,
                  location: "Narayanganj",
                  price: "From $60/day",
                  image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600",
                },
              ].map((company) => (
                <TouchableOpacity
                  key={company.id}
                  onPress={() =>
                    router.push({
                      pathname: "/(customer)/(tabs)/home/company-details" as any,
                      params: {
                        id: company.id,
                        title: company.title,
                        subtitle: company.subtitle,
                        rating: company.rating.toString(),
                        location: company.location,
                        price: company.price,
                        image: company.image,
                      },
                    })
                  }
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-2"
                  activeOpacity={0.9}
                >
                  <View className="w-full h-48 bg-[#F3F4F6]">
                    <Image
                      source={{ uri: company.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="p-4 gap-1">
                    <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text className="text-brand-dark font-bold text-base">
                        {company.title}
                      </Text>
                      <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="star" size={14} color="#FFB800" />
                        <Text className="text-brand-dark text-xs font-black">
                          {company.rating}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-brand-gray text-xs">
                      {company.subtitle}
                    </Text>
                    <View className="flex-row justify-between items-center mt-2" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text className="text-[#F97316] font-bold text-sm">
                        {company.price}
                      </Text>
                      <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="location-outline" size={14} color="#6A7282" />
                        <Text className="text-brand-gray text-xs font-semibold">
                          {company.location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <CustomerProducts
            products={currentServiceData.products}
            onProductPress={(prod) => {
              router.push({
                pathname: "/(customer)/home/product-details" as any,
                params: {
                  id: prod.id,
                  title: prod.title,
                  price: prod.price.toString(),
                  rating: prod.rating.toString(),
                  image: prod.image,
                },
              });
            }}
            onAddProduct={(id) => {
              console.log("Added product to cart:", id);
              router.push({
                pathname: "/(customer)/cart",
                params: { service: selectedService },
              });
            }}
          />
        )}
      </ScrollView>

      {/* Filter Modal */}
      <CustomerFilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </SafeAreaView>
  );
}
