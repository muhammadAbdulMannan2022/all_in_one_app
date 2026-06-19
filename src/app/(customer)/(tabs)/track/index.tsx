import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function TrackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isCancelled = params?.cancelled === "true";

  // Tab selections: All Activities, Bookings, Orders, Ride
  const [activeTab, setActiveTab] = useState("Orders");

  // Leaflet HTML source for OpenStreetMap
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
        .custom-pin {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #F97316;
          width: 24px;
          height: 24px;
          border-radius: 12px;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .custom-tooltip {
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 9999px;
          padding: 4px 10px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 10px;
          font-weight: bold;
          color: #F97316;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', {
          zoomControl: false,
          dragging: false,
          touchZoom: false,
          doubleClickZoom: false,
          scrollWheelZoom: false
        }).setView([23.8103, 90.4125], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        var marker = L.marker([23.8103, 90.4125], {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='custom-pin'><div style='width: 8px; height: 8px; border-radius: 4px; background-color: white;'></div></div>",
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          })
        }).addTo(map);

        marker.bindTooltip("Your Location", {
          permanent: true,
          direction: 'bottom',
          className: 'custom-tooltip',
          offset: [0, 8]
        }).openTooltip();
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* Header bar */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2 h-16">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>

        <Text className="text-[#1F2937] text-lg font-bold">Live Track</Text>

        <TouchableOpacity className="w-11 h-11 items-center justify-center relative">
          <Ionicons name="notifications-outline" size={22} color="#6A7282" />
          <View className="absolute top-1.5 right-1.5 bg-[#F97316] w-4 h-4 rounded-full items-center justify-center">
            <Text className="text-white text-[9px] font-bold">1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs Selection */}
      <View className="flex-row justify-between border-b border-gray-100 px-6 mt-2">
        {["All Activities", "Bookings", "Orders", "Ride"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="pb-3 relative flex-1 items-center"
            >
              <Text
                className={`text-xs ${isActive ? "text-[#1F2937] font-bold" : "text-[#9CA3AF] font-medium"}`}
              >
                {tab}
              </Text>
              {isActive && (
                <View className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#F97316] rounded-full" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Main Content */}
      {activeTab === "Orders" && !isCancelled ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
          className="px-6 pt-6"
        >
          {/* Active Order Card */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Active Order
          </Text>

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
                source={{ html: leafletMapHtml }}
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
                onPress={() =>
                  router.push("/(customer)/(tabs)/track/cancel-order")
                }
                className="flex-1 py-3.5 rounded-2xl border border-gray-200 bg-white items-center justify-center"
              >
                <Text className="text-gray-500 font-bold text-xs">
                  Cancel Order
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(customer)/(tabs)/track/order-detail")
                }
                className="flex-1 py-3.5 rounded-2xl border border-[#F97316] bg-white items-center justify-center"
              >
                <Text className="text-[#F97316] font-bold text-xs">
                  Track Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity Section */}
          <Text className="text-[#1F2937] text-sm font-bold mt-6 mb-3">
            Recent Activity
          </Text>

          <View className="gap-3">
            {/* Edamame */}
            <View
              className="bg-white rounded-2xl p-3 border border-gray-100 flex-row items-center justify-between"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                className="flex-row items-center gap-3"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=120",
                  }}
                  className="w-12 h-12 rounded-2xl"
                />
                <View>
                  <Text className="text-[#1F2937] font-bold text-xs">
                    Edamame
                  </Text>
                  <Text className="text-[#9CA3AF] text-[9px] font-medium mt-0.5">
                    2 days ago
                  </Text>
                </View>
              </View>
              <View className="bg-[#ECFDF5] px-2.5 py-1 rounded-full">
                <Text className="text-[#059669] text-[9px] font-bold">
                  Delivered
                </Text>
              </View>
            </View>

            {/* BMW X5 */}
            <View
              className="bg-white rounded-2xl p-3 border border-gray-100 flex-row items-center justify-between"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                className="flex-row items-center gap-3"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View className="w-12 h-12 rounded-2xl bg-[#FFF7ED] items-center justify-center">
                  <Ionicons name="car-sport" size={22} color="#F97316" />
                </View>
                <View>
                  <Text className="text-[#1F2937] font-bold text-xs">
                    BMW X5 Rental
                  </Text>
                  <Text className="text-[#9CA3AF] text-[9px] font-medium mt-0.5">
                    2 days ago
                  </Text>
                </View>
              </View>
              <View className="bg-[#ECFDF5] px-2.5 py-1 rounded-full">
                <Text className="text-[#059669] text-[9px] font-bold">
                  Delivered
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        /* Empty State with notOrder.png */
        <View className="flex-1 items-center justify-center px-8 pb-20">
          <Image
            source={require("@/assets/illustrations/notOrder.png")}
            className="w-64 h-64 mb-5"
            resizeMode="contain"
          />
          <Text className="text-[#1F2937] font-bold text-lg mb-2">
            No Active Orders
          </Text>
          <Text className="text-[#9CA3AF] text-center text-xs leading-5 px-6 mb-8 font-medium">
            Your active orders, rides and car rentals will appear here for
            real-time tracking
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(customer)/(tabs)/home")}
            className="w-full py-4 rounded-2xl items-center justify-center shadow-lg shadow-[#F97316]/10"
            style={{ backgroundColor: "#F97316" }}
          >
            <Text className="text-white font-bold text-sm">Brows Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
