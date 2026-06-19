import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function CarDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve car parameters
  const id = (params.id as string) || "car_s1";
  const title = (params.title as string) || "Toyota Camry 2022";
  const price = parseFloat((params.price as string) || "1200");
  const category = (params.category as string) || "SEDAN";
  const image =
    (params.image as string) ||
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600";
  const speed = (params.speed as string) || "220 km/h";
  const transmission = (params.transmission as string) || "Automatic";
  const capacity = (params.capacity as string) || "5 Person";
  const fuel = (params.fuel as string) || "Petrol";
  const description =
    (params.description as string) ||
    "The Toyota Camry 2022 is a groundbreaking mid-size sedan offering comfort, high-efficiency, and premium safety features. Perfect for business trips and standard family rides.";

  const [isReadMore, setIsReadMore] = useState(false);

  // Leaflet HTML source for OpenStreetMap (centered at Narayanganj route)
  const leafletMapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; background-color: #f3f4f6; }
        #map { height: 100vh; width: 100vw; }
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom { display: none !important; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', {
          zoomControl: false,
          dragging: false,
          touchZoom: false,
          scrollWheelZoom: false,
          doubleClickZoom: false
        }).setView([23.6238, 90.5000], 13); // Narayanganj

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        var startMarker = L.marker([23.6200, 90.4900]).addTo(map);
        var endMarker = L.marker([23.6300, 90.5100]).addTo(map);

        var latlngs = [
          [23.6200, 90.4900],
          [23.6250, 90.5000],
          [23.6300, 90.5100]
        ];
        var polyline = L.polyline(latlngs, {color: '#F97316', weight: 4}).addTo(map);
      </script>
    </body>
    </html>
  `;

  const handleBookNow = () => {
    router.push({
      pathname: "/(customer)/(tabs)/home/select-date" as any,
      params: {
        id,
        title,
        price: price.toString(),
        category,
        image,
        speed,
        transmission,
        capacity,
        fuel,
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Header Hero Area */}
        <View className="w-full h-80 relative">
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Top Navigation */}
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

          {/* Bottom Dark Gradient Text Overlay */}
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
              <View className="flex-row justify-between items-end" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Text className="text-white text-xl font-black flex-1 mr-4">{title}</Text>
                <View className="items-end">
                  <Text className="text-[#F97316] text-lg font-black">${price}</Text>
                  <Text className="text-gray-300 text-[8px] font-bold">/day</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center mt-1" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text className="text-gray-300 text-xs font-semibold">{category} Class</Text>
                <View className="flex-row items-center gap-1" style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text className="text-white text-[10px] font-black">4.5 (250 Review)</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Details Section */}
        <View className="px-6 pt-6">

          {/* Specifications Header */}
          <Text className="text-brand-dark text-sm font-black mb-3">Specifications</Text>

          {/* Specs grid */}
          <View className="flex-row flex-wrap justify-between gap-y-3 mb-6" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {[
              { label: "Top Speed", value: speed, icon: "speedometer-outline" },
              { label: "Transmission", value: transmission, icon: "cog-outline" },
              { label: "Engine", value: "2300 HP", icon: "flash-outline" },
              { label: "Capacity", value: capacity, icon: "people-outline" },
              { label: "Fuel Type", value: fuel, icon: "water-outline" },
            ].map((spec, index) => (
              <View
                key={index}
                className="w-[31%] bg-[#F9FAFB] rounded-2xl p-3 items-center justify-center border border-gray-50"
              >
                <View className="w-8 h-8 rounded-full bg-white justify-center items-center shadow-sm mb-2">
                  <Ionicons name={spec.icon as any} size={16} color="#F97316" />
                </View>
                <Text className="text-[#1F2937] text-[10px] font-black text-center" numberOfLines={1}>
                  {spec.value}
                </Text>
                <Text className="text-gray-400 text-[8px] font-semibold mt-0.5 text-center">
                  {spec.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Map Preview Webview Container */}
          <View className="w-full h-40 rounded-2xl overflow-hidden border border-gray-100 mb-6 relative">
            <WebView
              originWhitelist={["*"]}
              source={{ html: leafletMapHtml }}
              className="w-full h-full"
            />
            {/* View Full Map label overlay */}
            <View className="absolute bottom-2.5 right-2.5 bg-white px-2.5 py-1.5 rounded-lg border border-gray-100 shadow-sm flex-row items-center gap-1">
              <Ionicons name="expand-outline" size={10} color="#F97316" />
              <Text className="text-[#F97316] text-[8px] font-black">View Full Map</Text>
            </View>
          </View>

          {/* Description Section */}
          <Text className="text-brand-dark text-sm font-black mb-2">Details</Text>
          <Text className="text-gray-500 text-xs leading-5">
            {isReadMore ? description : `${description.slice(0, 100)}... `}
            <Text
              onPress={() => setIsReadMore(!isReadMore)}
              className="text-[#F97316] font-bold text-xs"
            >
              {isReadMore ? "Read Less" : "Read More..."}
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Book Now Button */}
      <View className="absolute bottom-6 left-6 right-6 z-30">
        <TouchableOpacity
          onPress={handleBookNow}
          className="w-full py-4 rounded-2xl items-center justify-center bg-[#F97316] shadow-md"
        >
          <Text className="text-white text-sm font-black">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
