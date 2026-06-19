import { TrackActiveBooking } from "@/components/customer/track-active-booking";
import { TrackActiveOrder } from "@/components/customer/track-active-order";
import { TrackEmptyState } from "@/components/customer/track-empty-state";
import { TrackRecentActivity } from "@/components/customer/track-recent-activity";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      {activeTab === "Bookings" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
          className="px-6 pt-6"
        >
          {/* Active Booking Section */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Active Booking
          </Text>

          <TrackActiveBooking
            onViewDetails={() =>
              router.push("/(customer)/(tabs)/track/booking-detail")
            }
          />

          {/* Recent Activity Section */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Recent Activity
          </Text>

          <TrackRecentActivity />
        </ScrollView>
      ) : activeTab === "Orders" && !isCancelled ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
          className="px-6 pt-6"
        >
          {/* Active Order Card */}
          <Text className="text-[#1F2937] text-sm font-bold mb-3">
            Active Order
          </Text>

          <TrackActiveOrder
            mapHtml={leafletMapHtml}
            onCancel={() =>
              router.push("/(customer)/(tabs)/track/cancel-order")
            }
            onTrack={() => router.push("/(customer)/(tabs)/track/order-detail")}
          />

          {/* Recent Activity Section */}
          <Text className="text-[#1F2937] text-sm font-bold mt-6 mb-3">
            Recent Activity
          </Text>

          <TrackRecentActivity />
        </ScrollView>
      ) : (
        <TrackEmptyState
          onBrowsePress={() => router.push("/(customer)/(tabs)/home")}
        />
      )}
    </SafeAreaView>
  );
}
