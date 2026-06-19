//@ts-ignore
import bus from "@/assets/delivery-bus.png";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function OrderDetailScreen() {
  const router = useRouter();

  // Leaflet HTML source for OpenStreetMap with route polyline and driver avatar
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
          background-color: #F97316;
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
        // Set view bounding the route path
        var map = L.map('map', {zoomControl: false}).setView([23.8130, 90.4150], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        // Coordinates
        var startCoords = [23.8103, 90.4125]; // Destination (User)
        var driverCoords = [23.8135, 90.4155]; // Driver en route
        var shopCoords = [23.8160, 90.4180]; // Restaurant (Sakura Garden)

        // Add polyline path
        var routeLine = L.polyline([shopCoords, driverCoords, startCoords], {
          color: '#F97316',
          weight: 4,
          opacity: 0.85
        }).addTo(map);

        // Fit map bounds to show complete route
        map.fitBounds(routeLine.getBounds(), {
          padding: [50, 50]
        });

        // Add starting point marker (User destination)
        L.marker(startCoords, {
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='start-marker'></div>",
            iconSize: [12, 12],
            iconAnchor: [6, 6]
          })
        }).addTo(map);

        // Add driver marker with avatar
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

  return (
    <View className="flex-1 bg-white relative">
      {/* Floating Back Button */}
      <SafeAreaView
        className="absolute top-0 left-0 right-0 z-20 pointer-events-box-none"
        edges={["top"]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="ml-6 mt-4 w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-md"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Top half: Map View */}
      <View className="flex-1 min-h-[340px] bg-[#E5E7EB]">
        <WebView
          originWhitelist={["*"]}
          source={{ html: leafletRouteHtml }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ flex: 1 }}
        />
      </View>

      {/* Bottom half: Detail Sliding Sheet */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white rounded-t-[40px] -mt-10 z-10 shadow-2xl"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="px-6 pt-5">
          {/* Animated Delivery Truck graphic header */}
          <View className="items-center mb-6">
            <View className="w-12 h-1.5 bg-gray-200 rounded-full mb-5" />

            {/* Delivery truck sliding graphic */}
            <View className="items-center relative w-full h-12 justify-center">
              <Image source={bus} />
            </View>
          </View>

          {/* Price Summary Container */}
          <Text className="text-[#1F2937] font-bold text-sm mb-3">
            Price Summary
          </Text>
          <View className="bg-[#FCFAF9] rounded-2xl p-4 mb-6 border border-gray-100">
            <View
              className="flex-row justify-between items-center py-2.5"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text className="text-gray-500 text-xs font-semibold">
                Total Items
              </Text>
              <Text className="text-gray-700 text-xs font-bold">5 Items</Text>
            </View>
            <View
              className="flex-row justify-between items-center py-2.5"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text className="text-gray-500 text-xs font-semibold">
                Sub Total
              </Text>
              <Text className="text-gray-700 text-xs font-bold">$155.00</Text>
            </View>
            <View
              className="flex-row justify-between items-center py-2.5"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text className="text-gray-500 text-xs font-semibold">
                Delivery Fee
              </Text>
              <Text className="text-[#10B981] text-xs font-bold">Free</Text>
            </View>
            <View
              className="flex-row justify-between items-center py-2.5"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text className="text-gray-500 text-xs font-semibold">
                Tax (8%)
              </Text>
              <Text className="text-gray-700 text-xs font-bold">$0.48</Text>
            </View>

            {/* Dashed Separator */}
            <View className="border-b border-dashed border-gray-200 my-2" />

            <View
              className="flex-row justify-between items-center py-1.5"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text className="text-[#1F2937] text-xs font-bold">Total</Text>
              <Text className="text-[#F97316] text-sm font-black">$30.43</Text>
            </View>
          </View>

          {/* Timeline Status Checklist */}
          <View className="gap-5 pl-2 relative mb-6">
            {/* Vertical connector line */}
            <View className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gray-150" />

            {/* Timeline Item 1 */}
            <View
              className="flex-row items-center gap-3"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View className="w-6 h-6 rounded-full bg-[#F97316] items-center justify-center z-10 shadow-sm">
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
              <Text className="text-[#F97316] text-xs font-bold">
                Your order has been received
              </Text>
            </View>

            {/* Timeline Item 2 */}
            <View
              className="flex-row items-center gap-3"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View className="w-6 h-6 rounded-full bg-[#E5E7EB] items-center justify-center z-10 border border-white">
                <Ionicons name="checkmark" size={14} color="#9CA3AF" />
              </View>
              <Text className="text-gray-400 text-xs font-medium">
                Your order has been picked up for delivery
              </Text>
            </View>

            {/* Timeline Item 3 */}
            <View
              className="flex-row items-center gap-3"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View className="w-6 h-6 rounded-full bg-[#E5E7EB] items-center justify-center z-10 border border-white">
                <Ionicons name="checkmark" size={14} color="#9CA3AF" />
              </View>
              <Text className="text-gray-400 text-xs font-medium">
                Order arriving soon!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
