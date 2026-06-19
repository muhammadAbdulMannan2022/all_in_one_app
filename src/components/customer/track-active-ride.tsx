import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface TrackActiveRideProps {
  onCancel: () => void;
  onLiveTrack: () => void;
}

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

export function TrackActiveRide({ onCancel, onLiveTrack }: TrackActiveRideProps) {
  return (
    <View className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-md">
      {/* Car header */}
      <View
        className="flex-row items-center gap-3 mb-4"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View className="w-11 h-11 rounded-2xl bg-[#FFF7ED] items-center justify-center">
          <Ionicons name="car" size={22} color="#F97316" />
        </View>
        <View>
          <Text className="text-[#1F2937] font-bold text-sm">
            Honda Civic
          </Text>
          <Text className="text-[#9CA3AF] text-[10px] mt-0.5 font-medium">
            Economy
          </Text>
        </View>
      </View>

      {/* Map WebView */}
      <View className="h-44 rounded-[24px] overflow-hidden mb-4 border border-gray-100 bg-[#E5E7EB]">
        <WebView
          originWhitelist={["*"]}
          source={{ html: leafletMapHtml }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={false}
          style={{ flex: 1 }}
        />
      </View>

      {/* Destination & Estimate Fare */}
      <View
        className="flex-row justify-between items-center mb-5 px-1"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View className="items-start">
          <Text className="text-[#1F2937] font-bold text-sm">
            Narayanganj
          </Text>
          <Text className="text-[#9CA3AF] text-[10px] font-semibold mt-0.5">
            Destination
          </Text>
        </View>

        {/* Vertical divider */}
        <View className="w-[1px] h-8 bg-gray-150" />

        <View className="items-end">
          <Text className="text-[#F97316] font-bold text-sm">
            $30.43
          </Text>
          <Text className="text-[#9CA3AF] text-[10px] font-semibold mt-0.5">
            Estimate Fare
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3" style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onCancel}
          className="flex-1 py-3 rounded-full border border-gray-200 bg-white items-center justify-center"
        >
          <Text className="text-gray-500 font-bold text-xs">
            Cancel Ride
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLiveTrack}
          className="flex-1 py-3 rounded-full border border-[#F97316] bg-white items-center justify-center"
        >
          <Text className="text-[#F97316] font-bold text-xs">
            Live Track
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
