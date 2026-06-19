import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
        width: 36px;
        height: 36px;
        border-radius: 18px;
        border: 2px solid #F97316;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
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
      var driverCoords = [23.8135, 90.4155]; // Driver en route
      var shopCoords = [23.8160, 90.4180]; // Start

      var routeLine = L.polyline([shopCoords, driverCoords, startCoords], {
        color: '#F97316',
        weight: 4,
        opacity: 0.85
      }).addTo(map);

      map.fitBounds(routeLine.getBounds(), {
        padding: [50, 50]
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
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        })
      }).addTo(map);
    </script>
  </body>
  </html>
`;

export default function RideDetailScreen() {
  const router = useRouter();

  const handleProceedToPayment = () => {
    // Navigate directly to the reused payment screen, passing total and driver parameters
    router.push({
      pathname: "/(customer)/payment",
      params: {
        service: "ride",
        total: "30.43",
        fullName: "Rahim Rehman",
      },
    });
  };

  return (
    <View className="flex-1 bg-white relative">
      {/* Floating Back Button */}
      <SafeAreaView
        className="absolute top-0 left-0 right-0 z-20 pointer-events-box-none"
        edges={["top"]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="ml-6 mt-4 w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-md pointer-events-auto"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Top Map View */}
      <View className="flex-1 min-h-[340px] bg-[#E5E7EB]">
        <WebView
          originWhitelist={["*"]}
          source={{ html: leafletRouteHtml }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ flex: 1 }}
        />
      </View>

      {/* Bottom sliding sheet */}
      <View 
        className="bg-white rounded-t-[40px] -mt-10 z-10 shadow-2xl p-6 pb-8 border-t border-gray-50"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        {/* Drag handle line indicator */}
        <View className="items-center mb-6">
          <View className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </View>

        {/* Heading status */}
        <View className="mb-6">
          <Text className="text-[#1F2937] text-lg font-bold">
            Driver is on the way
          </Text>
          <Text className="text-gray-400 text-xs font-semibold mt-1">
            Arriving in 12 mins
          </Text>
        </View>

        {/* Driver Row Card */}
        <View 
          className="flex-row items-center justify-between bg-gray-50 rounded-3xl p-4 mb-6 border border-gray-100"
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <View 
            className="flex-row items-center gap-3"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
              }}
              className="w-12 h-12 rounded-full border border-white"
            />
            <View>
              <View className="flex-row items-center gap-1.5" style={{ flexDirection: "row", alignItems: "center" }}>
                <Text className="text-[#1F2937] font-bold text-sm">
                  Rahim Rehman
                </Text>
                <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text className="text-[#1F2937] text-[10px] font-black">4.5</Text>
                </View>
              </View>
              <Text className="text-gray-400 text-[10px] font-semibold mt-0.5">
                Honda Civic
              </Text>
              {/* Plate badge */}
              <View className="bg-gray-200 rounded px-2 py-0.5 mt-1 self-start">
                <Text className="text-[#1F2937] text-[9px] font-black">
                  G - 1023
                </Text>
              </View>
            </View>
          </View>

          {/* Call button */}
          <TouchableOpacity className="w-12 h-12 bg-[#F97316] rounded-full items-center justify-center shadow-md shadow-orange-500/20">
            <Ionicons name="call" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Proceed to Arrival & Payment button */}
        <TouchableOpacity
          onPress={handleProceedToPayment}
          className="w-full bg-[#F97316] py-4 rounded-2xl items-center justify-center shadow-lg shadow-orange-500/25"
        >
          <Text className="text-white text-base font-bold">
            Simulate Arrival & Pay ($30.43)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
