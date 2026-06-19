import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

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
      .pickup-pin {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #10B981;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      }
      .dest-pin {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F97316;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.map('map', { zoomControl: false }).setView([23.8103, 90.4125], 14);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Initial Pickup location marker
      var pickupMarker = L.marker([23.8103, 90.4125], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: "<div class='pickup-pin'></div>",
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        })
      }).addTo(map);

      // Initial Destination location marker (slightly offset)
      var destMarker = L.marker([23.8180, 90.4220], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: "<div class='dest-pin'></div>",
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        })
      }).addTo(map);

      // Draw route polyline
      L.polyline([[23.8103, 90.4125], [23.8130, 90.4160], [23.8180, 90.4220]], {
        color: '#F97316',
        weight: 4,
        opacity: 0.8
      }).addTo(map);
    </script>
  </body>
  </html>
`;

export default function SetDestinationScreen() {
  const router = useRouter();
  const [pickup, setPickup] = useState("wireless gate, Mohakhali");
  const [destination, setDestination] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUseCurrentLocation = () => {
    setPickup("wireless gate, Mohakhali (Current Location)");
  };

  const handleConfirm = () => {
    // Show success dialog
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    // Go back to home page
    router.replace("/(customer)/(tabs)/home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      className="flex-1 bg-white"
      style={{ flex: 1 }}
    >
      {/* Tall/Full Map background */}
      <View className="absolute inset-0 z-0">
        <WebView
          originWhitelist={["*"]}
          source={{ html: leafletMapHtml }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ flex: 1 }}
        />
      </View>

      <SafeAreaView className="flex-1 z-10 pointer-events-box-none" edges={["top", "bottom"]}>
        {/* Floating Back Button */}
        <View className="px-6 pt-4 pointer-events-auto">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-md"
          >
            <Ionicons name="chevron-back" size={20} color="#6A7282" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Container overlaying at the bottom */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 pointer-events-box-none"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          <View 
            className="bg-white rounded-t-[36px] p-6 shadow-2xl border-t border-gray-100 pointer-events-auto"
            style={{ 
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -10 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 20
            }}
          >
            <Text className="text-[#1F2937] text-base font-bold mb-4">
              Set Your Destination
            </Text>

            {/* Inputs Wrapper */}
            <View className="gap-4 mb-6">
              {/* Pickup location field */}
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 gap-3">
                <Ionicons name="location-outline" size={18} color="#10B981" />
                <TextInput
                  value={pickup}
                  onChangeText={setPickup}
                  placeholder="Pickup location"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-[#1F2937] text-xs font-semibold p-0"
                />
              </View>

              {/* Use current location link */}
              <TouchableOpacity
                onPress={handleUseCurrentLocation}
                className="flex-row items-center gap-1.5 self-start px-1"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Ionicons name="navigate" size={14} color="#F97316" />
                <Text className="text-[#F97316] text-xs font-bold">
                  Use current location
                </Text>
              </TouchableOpacity>

              {/* Destination field */}
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 gap-3">
                <Ionicons name="location-outline" size={18} color="#9CA3AF" />
                <TextInput
                  value={destination}
                  onChangeText={setDestination}
                  placeholder="Where to?"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-[#1F2937] text-xs font-semibold p-0"
                />
              </View>
            </View>

            {/* Confirm button */}
            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-[#F97316] rounded-2xl py-4 items-center justify-center shadow-lg shadow-orange-500/20"
            >
              <Text className="text-white text-sm font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Success Popup Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSuccess}
      >
        <View className="flex-1 bg-black/50 items-center justify-center px-6">
          <View className="bg-white rounded-3xl p-6 items-center w-full max-w-xs shadow-2xl">
            {/* Orange success icon */}
            <View className="w-16 h-16 rounded-full bg-[#FFF7ED] items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={40} color="#F97316" />
            </View>

            {/* Success title */}
            <Text className="text-[#1F2937] font-bold text-base text-center mb-2">
              Request Sent!
            </Text>

            {/* Success message */}
            <Text className="text-gray-400 text-xs text-center leading-5 mb-6">
              Your request is sent! Hang tight, a Captain will be assigned to you shortly.
            </Text>

            {/* Close/OK button */}
            <TouchableOpacity
              onPress={handleCloseSuccess}
              className="bg-[#F97316] rounded-xl py-3 px-8 w-full items-center"
            >
              <Text className="text-white font-bold text-xs">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
