import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingDetailsScreen() {
  const router = useRouter();

  // Mock details matching active booking screen
  const car = {
    title: "Toyota Camry 2022",
    price: 1200,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600",
    transmission: "Automatic",
    capacity: "7 Person",
    category: "SEDAN",
    speed: "12.5",
  };

  const booking = {
    pickupDate: "Oct 12, 2026",
    pickupTime: "10:00 AM",
    pickupLocation: "Narayanganj Sadar",
    dropDate: "Oct 15, 2026",
    dropTime: "10:00 AM",
    dropLocation: "Narayanganj Sadar",
    days: 3,
  };

  // Calculations
  const rentalCharge = car.price * booking.days;
  const insuranceFee = 50;
  const taxesFees = 36;
  const totalAmount = rentalCharge + insuranceFee + taxesFees;

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
          <Text className="text-[#1F2937] text-lg font-black">Booking Details</Text>
          <View className="w-11 h-11" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="bg-brand-bg/10"
        >
          <View className="px-6 pt-6 gap-5">
            {/* Selected Car Details Card */}
            <View className="bg-white border border-gray-100 rounded-3xl p-4 flex-row items-center gap-4 shadow-sm">
              <View className="w-24 h-16 bg-[#F9FAFB] rounded-2xl overflow-hidden justify-center items-center">
                <Image source={{ uri: car.image }} className="w-[85%] h-[85%]" resizeMode="contain" />
              </View>
              <View className="flex-1 justify-center gap-0.5">
                <Text className="text-brand-dark font-extrabold text-sm">{car.title}</Text>
                {/* Specs row */}
                <View className="flex-row items-center gap-2 mt-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                  <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="cog-outline" size={10} color="#9CA3AF" />
                    <Text className="text-gray-400 text-[8px] font-bold">
                      {car.transmission === "Automatic" ? "A" : "M"}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="people-outline" size={10} color="#9CA3AF" />
                    <Text className="text-gray-400 text-[8px] font-bold">{car.capacity.split(" ")[0]}</Text>
                  </View>
                </View>
                <Text className="text-[#F97316] text-xs font-black mt-1">${car.price}/day</Text>
              </View>
            </View>

            {/* Status Tracking progress card */}
            <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm gap-4">
              <View className="flex-row justify-between items-center" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text className="text-[#6A7282] text-xs font-bold">Status</Text>
                <View className="bg-[#EBFDF5] px-2.5 py-0.5 rounded-full flex-row items-center gap-0.5" style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="checkmark-circle" size={10} color="#10B981" />
                  <Text className="text-[#10B981] text-[9px] font-extrabold">Active</Text>
                </View>
              </View>

              {/* Progress Stepper bar */}
              <View className="flex-row items-center justify-between px-3 py-1 mt-1 relative" style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {/* Horizontal connector lines */}
                <View className="absolute left-8 right-8 top-5 h-[2px] bg-gray-100" />
                <View className="absolute left-8 w-[40%] top-5 h-[2px] bg-[#F97316]" />

                {/* Step 1: Booked */}
                <View className="items-center z-10 w-[24%]">
                  <View className="w-8 h-8 rounded-full bg-[#F97316] items-center justify-center shadow-sm">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                  <Text className="text-brand-dark text-[8px] font-black mt-1.5 text-center">Booked</Text>
                </View>

                {/* Step 2: Ready for Pickup */}
                <View className="items-center z-10 w-[24%]">
                  <View className="w-8 h-8 rounded-full bg-[#F3F4F6] items-center justify-center border border-gray-100 shadow-sm">
                    <Ionicons name="car-outline" size={14} color="#9CA3AF" />
                  </View>
                  <Text className="text-gray-400 text-[8px] font-bold mt-1.5 text-center">Ready for Pickup</Text>
                </View>

                {/* Step 3: Returned */}
                <View className="items-center z-10 w-[24%]">
                  <View className="w-8 h-8 rounded-full bg-[#F3F4F6] items-center justify-center border border-gray-100 shadow-sm">
                    <Ionicons name="flag-outline" size={14} color="#9CA3AF" />
                  </View>
                  <Text className="text-gray-400 text-[8px] font-bold mt-1.5 text-center">Returned</Text>
                </View>
              </View>
            </View>

            {/* Pickup & Dropoff cards side-by-side */}
            <View className="flex-row gap-3" style={{ flexDirection: "row" }}>
              {/* Pickup card */}
              <View className="flex-1 bg-white border border-gray-100 rounded-3xl p-4 shadow-sm gap-2">
                <View className="flex-row items-center gap-1.5" style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="car-outline" size={14} color="#F97316" />
                  <Text className="text-[#1F2937] text-xs font-black">Pick Up</Text>
                </View>
                <View className="gap-0.5 mt-1">
                  <Text className="text-gray-400 text-[9px] font-bold">Date</Text>
                  <Text className="text-brand-dark text-[10px] font-extrabold">{booking.pickupDate}</Text>
                </View>
                <View className="gap-0.5">
                  <Text className="text-gray-400 text-[9px] font-bold">Time</Text>
                  <Text className="text-brand-dark text-[10px] font-extrabold">{booking.pickupTime}</Text>
                </View>
                <View className="gap-0.5">
                  <Text className="text-gray-400 text-[9px] font-bold">Location</Text>
                  <Text className="text-brand-dark text-[10px] font-extrabold" numberOfLines={1}>{booking.pickupLocation}</Text>
                </View>
              </View>

              {/* Dropoff card */}
              <View className="flex-1 bg-white border border-gray-100 rounded-3xl p-4 shadow-sm gap-2">
                <View className="flex-row items-center gap-1.5" style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="car-outline" size={14} color="#F97316" />
                  <Text className="text-[#1F2937] text-xs font-black">Drop Off</Text>
                </View>
                <View className="gap-0.5 mt-1">
                  <Text className="text-gray-400 text-[9px] font-bold">Date</Text>
                  <Text className="text-brand-dark text-[10px] font-extrabold">{booking.dropDate}</Text>
                </View>
                <View className="gap-0.5">
                  <Text className="text-gray-400 text-[9px] font-bold">Time</Text>
                  <Text className="text-brand-dark text-[10px] font-extrabold">{booking.dropTime}</Text>
                </View>
                <View className="gap-0.5">
                  <Text className="text-gray-400 text-[9px] font-bold">Location</Text>
                  <Text className="text-brand-dark text-[10px] font-extrabold" numberOfLines={1}>{booking.dropLocation}</Text>
                </View>
              </View>
            </View>

            {/* Price Summary card */}
            <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm gap-4">
              <Text className="text-[#1F2937] text-sm font-black border-b border-gray-50 pb-2">
                Price Summary
              </Text>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <View>
                  <Text className="text-[#1F2937] text-xs font-bold">Rental Charge</Text>
                  <Text className="text-gray-400 text-[8px] font-semibold">${car.price} * {booking.days} Days</Text>
                </View>
                <Text className="text-brand-dark text-xs font-black">${rentalCharge.toFixed(2)}</Text>
              </View>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Insurance Fee</Text>
                <Text className="text-brand-dark text-xs font-black">${insuranceFee.toFixed(2)}</Text>
              </View>

              <View className="flex-row justify-between items-center" style={{ flexDirection: "row" }}>
                <Text className="text-gray-400 text-xs font-bold">Taxes & Fees</Text>
                <Text className="text-brand-dark text-xs font-black">${taxesFees.toFixed(2)}</Text>
              </View>

              <View className="border-t border-gray-100 pt-4 flex-row justify-between items-center mt-2" style={{ flexDirection: "row" }}>
                <Text className="text-[#1F2937] text-sm font-black">Total</Text>
                <Text className="text-[#F97316] text-base font-black">${totalAmount.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
