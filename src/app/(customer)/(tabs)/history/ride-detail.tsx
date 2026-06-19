import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const leafletRouteHtml = `
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
      .driver-marker {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        border: 2px solid #F97316;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        overflow: hidden;
      }
      .driver-marker img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .start-marker {
        background-color: #10B981;
        width: 12px;
        height: 12px;
        border-radius: 6px;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.map('map', {zoomControl: false}).setView([23.8130, 90.4150], 14);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      var startCoords = [23.8103, 90.4125]; // Destination (User)
      var driverCoords = [23.8135, 90.4155]; // Driver location
      var shopCoords = [23.8160, 90.4180]; // Start Location

      var routeLine = L.polyline([shopCoords, driverCoords, startCoords], {
        color: '#F97316',
        weight: 4,
        opacity: 0.85
      }).addTo(map);

      map.fitBounds(routeLine.getBounds(), {
        padding: [40, 40]
      });

      L.marker(startCoords, {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: "<div class='start-marker'></div>",
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        })
      }).addTo(map);

      L.marker(driverCoords, {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: "<div class='driver-marker'><img src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' /></div>",
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })
      }).addTo(map);
    </script>
  </body>
  </html>
`;

export default function RideTripDetailScreen() {
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

        <Text className="text-[#1F2937] text-lg font-bold">Ride Trip Details</Text>

        <View className="w-11 h-11" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Map View snippet */}
        <View className="h-44 rounded-3xl overflow-hidden mb-5 border border-gray-100 bg-[#E5E7EB]">
          <WebView
            originWhitelist={["*"]}
            source={{ html: leafletRouteHtml }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={false}
            style={{ flex: 1 }}
          />
        </View>

        {/* Trip Description Banner Header */}
        <View className="flex-row items-center justify-between bg-white border border-gray-50 rounded-3xl p-4 mb-4 shadow-sm">
          <View className="flex-1 pr-3">
            <Text className="text-[#1F2937] font-bold text-sm">
              Trip to Narayanganj Sadar
            </Text>
            <Text className="text-gray-400 text-[10px] font-semibold mt-1">
              Oct 20, 2026 • 2:30 PM
            </Text>
          </View>
          <View 
            className="flex-row items-center gap-1 bg-[#EEFDF7] border border-[#D1FAE5] px-2.5 py-1 rounded-full"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="checkmark-circle" size={10} color="#10B981" />
            <Text className="text-[#10B981] text-[10px] font-bold">Complete</Text>
          </View>
        </View>

        {/* Specs Columns Block (Distance & Driver) */}
        <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-5 shadow-sm flex-row justify-between items-center">
          {/* Distance */}
          <View className="flex-1 items-center">
            <View className="w-10 h-10 rounded-full bg-[#FFF7ED] items-center justify-center mb-2">
              <Ionicons name="location" size={18} color="#F97316" />
            </View>
            <Text className="text-[#1F2937] font-extrabold text-sm">5.2 KM</Text>
            <Text className="text-gray-400 text-[10px] font-semibold mt-0.5">Distance</Text>
          </View>

          {/* Divider */}
          <View className="w-[1.5px] h-12 bg-gray-100" />

          {/* Driver details */}
          <View className="flex-1 items-center">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
              }}
              className="w-10 h-10 rounded-full mb-2 bg-gray-100"
            />
            <Text className="text-[#1F2937] font-bold text-sm">Rahim Rehman</Text>
            <View className="flex-row items-center gap-0.5 mt-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="star" size={10} color="#FFB800" />
              <Text className="text-gray-400 text-[10px] font-semibold">4.5</Text>
            </View>
          </View>
        </View>

        {/* Fare details breakdown card */}
        <View className="bg-white border border-gray-100 rounded-3xl p-5 mb-5 shadow-sm">
          {/* Price rows */}
          <View className="gap-3.5 mb-4">
            <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View className="flex-row items-center gap-2" style={{ flexDirection: "row", alignItems: "center" }}>
                <View className="w-7 h-7 rounded-lg bg-[#FFF7ED] items-center justify-center">
                  <Ionicons name="car" size={14} color="#F97316" />
                </View>
                <Text className="text-gray-500 text-xs font-semibold">Base Fare</Text>
              </View>
              <Text className="text-[#1F2937] text-xs font-bold">$5.00</Text>
            </View>

            <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View className="flex-row items-center gap-2" style={{ flexDirection: "row", alignItems: "center" }}>
                <View className="w-7 h-7 rounded-lg bg-[#FFF7ED] items-center justify-center">
                  <Ionicons name="location" size={14} color="#F97316" />
                </View>
                <Text className="text-gray-500 text-xs font-semibold">Distance (12.6 Km)</Text>
              </View>
              <Text className="text-[#1F2937] text-xs font-bold">$18.00</Text>
            </View>

            <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View className="flex-row items-center gap-2" style={{ flexDirection: "row", alignItems: "center" }}>
                <View className="w-7 h-7 rounded-lg bg-[#FFF7ED] items-center justify-center">
                  <Ionicons name="settings-sharp" size={14} color="#F97316" />
                </View>
                <Text className="text-gray-500 text-xs font-semibold">Service Fee</Text>
              </View>
              <Text className="text-[#1F2937] text-xs font-bold">$2.00</Text>
            </View>
          </View>

          {/* Dotted connector */}
          <View className="border-b border-dashed border-gray-250 my-2" />

          {/* Total display centered */}
          <View className="items-center py-2">
            <Text className="text-[#F97316] font-black text-2xl">$30.43</Text>
            <Text className="text-gray-400 text-[10px] font-semibold mt-1">Total Fare</Text>
          </View>
        </View>

        {/* Paid Card Badge banner */}
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

        {/* Ride Again Action Button */}
        <TouchableOpacity
          onPress={() => router.push("/(customer)/(tabs)/home")}
          className="w-full bg-[#F97316] py-4 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-orange-500/20"
          style={{ flexDirection: "row" }}
        >
          <Ionicons name="refresh" size={18} color="#FFFFFF" />
          <Text className="text-white text-base font-bold">Ride Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
