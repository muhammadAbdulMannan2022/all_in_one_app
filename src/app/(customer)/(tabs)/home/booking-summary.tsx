import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve parameters passed forward
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

  const fullName = (params.fullName as string) || "John Doe";
  const fromDate = (params.fromDate as string) || "06 Oct 2026";
  const toDate = (params.toDate as string) || "08 Oct 2026";
  const selectedTime = (params.selectedTime as string) || "10:00 AM";
  const durationDays = parseInt((params.durationDays as string) || "2");

  // Calculations
  const subtotal = price * durationDays;
  const serviceFee = 50;
  const total = subtotal + serviceFee;

  const handleConfirmBooking = () => {
    router.push({
      pathname: "/(customer)/payment" as any,
      params: {
        service: "car-rent",
        total: total.toString(),
        fullName,
        fromDate,
        toDate,
        selectedTime,
        durationDays: durationDays.toString(),
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        {/* Header Bar */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2 h-16 border-b border-gray-50">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
          >
            <Ionicons name="chevron-back" size={20} color="#6A7282" />
          </TouchableOpacity>
          <Text className="text-[#1F2937] text-lg font-black">Booking Summary</Text>
          <View className="w-11 h-11" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          <View className="px-6 pt-6 gap-6">
            {/* Selected Car Details Card */}
            <View className="bg-[#F9FAFB] border border-gray-100 rounded-3xl p-4 flex-row items-center gap-4">
              <View className="w-24 h-16 bg-white rounded-2xl overflow-hidden justify-center items-center shadow-sm">
                <Image source={{ uri: image }} className="w-[85%] h-[85%]" resizeMode="contain" />
              </View>
              <View className="flex-1 justify-center gap-0.5">
                <Text className="text-brand-dark font-extrabold text-sm">{title}</Text>
                <Text className="text-gray-400 text-[10px] font-semibold">{category} Class</Text>
                <Text className="text-[#F97316] text-xs font-black mt-1">${price}/day</Text>
              </View>
            </View>

            {/* Booking Details Section */}
            <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm gap-4">
              <Text className="text-[#1F2937] text-sm font-black border-b border-gray-50 pb-2">
                Booking Information
              </Text>
              
              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Renter Name</Text>
                <Text className="text-brand-dark text-xs font-black">{fullName}</Text>
              </View>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Pickup Date</Text>
                <Text className="text-brand-dark text-xs font-black">{fromDate}</Text>
              </View>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Return Date</Text>
                <Text className="text-brand-dark text-xs font-black">{toDate}</Text>
              </View>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Pickup Time</Text>
                <Text className="text-brand-dark text-xs font-black">{selectedTime}</Text>
              </View>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Duration</Text>
                <Text className="text-[#F97316] text-xs font-black">{durationDays} Days</Text>
              </View>
            </View>

            {/* Price Details Section */}
            <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm gap-4">
              <Text className="text-[#1F2937] text-sm font-black border-b border-gray-50 pb-2">
                Price Breakdowns
              </Text>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">
                  Rental Fee (${price} x {durationDays} Days)
                </Text>
                <Text className="text-brand-dark text-xs font-black">${subtotal.toFixed(2)}</Text>
              </View>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Service Fee</Text>
                <Text className="text-brand-dark text-xs font-black">${serviceFee.toFixed(2)}</Text>
              </View>

              <View className="border-t border-gray-100 pt-4 flex-row justify-between items-center mt-2" style={{ flexDirection: "row" }}>
                <Text className="text-[#1F2937] text-sm font-black">Total Payment</Text>
                <Text className="text-[#F97316] text-base font-black">${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Confirm Booking Button */}
        <View className="absolute bottom-6 left-6 right-6 z-10">
          <TouchableOpacity
            onPress={handleConfirmBooking}
            className="w-full py-4 rounded-2xl items-center justify-center bg-[#F97316] shadow-md"
          >
            <Text className="text-white text-sm font-black">Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
