import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BookingItem {
  id: string;
  customerName: string;
  pickupTime: string;
  status: "Booked" | "Preparing" | "Active" | "Cancellation";
  carName: string;
  duration: string;
  price: string;
  image: any;
}

export default function CarRentalDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(1);

  // Mock Bookings matching Image 1 details
  const todayBookings: BookingItem[] = [
    {
      id: "1",
      customerName: "Michel Chen",
      pickupTime: "Pickup : 10:00 AM",
      status: "Booked",
      carName: "Toyota Camry 2022",
      duration: "5 days",
      price: "$1200",
      image: require("@/assets/images/onboarding/3.png"),
    },
    {
      id: "2",
      customerName: "Michel Chen",
      pickupTime: "Pickup : 10:00 AM",
      status: "Preparing",
      carName: "Toyota Camry 2022",
      duration: "5 days",
      price: "$1200",
      image: require("@/assets/images/onboarding/3.png"),
    },
  ];

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleNotificationPress = () => {
    setUnreadNotifications(0);
    Alert.alert("Notifications", "You have no new alerts.");
  };

  const navigateToBookingsTab = () => {
    router.push("/(car-rental)/bookings" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <View className="w-12 h-12" />
        <View className="flex-row items-center gap-1.5">
          <Image
            source={require("@/assets/logo.png")}
            className="w-32 h-10"
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={handleNotificationPress} className="relative p-2 rounded-full bg-slate-50">
          <Ionicons name="notifications-outline" size={22} color="#6A7282" />
          {unreadNotifications > 0 && (
            <View className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-orange items-center justify-center">
              <Text className="text-white text-[9px] font-bold">1</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-5">
        {/* Brand Profile Card */}
        <View className="flex-row items-center justify-between bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-full overflow-hidden border border-slate-100 bg-slate-100 items-center justify-center">
              <Ionicons name="car-sport" size={32} color="#E4792F" />
            </View>
            <View className="justify-center">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-brand-dark text-base font-bold">Nexora DriveHub</Text>
                <View className="w-4 h-4 rounded-full bg-brand-orange items-center justify-center">
                  <Ionicons name="checkmark" size={10} color="white" />
                </View>
              </View>
              <View className="flex-row items-center gap-1 mt-1">
                <Ionicons name="location-sharp" size={14} color="#6A7282" />
                <Text className="text-brand-gray text-xs font-semibold">Narayanganj, Sadar</Text>
              </View>
            </View>
          </View>

          {/* Status switch */}
          <TouchableOpacity
            onPress={toggleStatus}
            className={`flex-row items-center border rounded-full p-1 w-24 h-9 relative ${
              isOnline ? "border-brand-orange bg-white" : "border-slate-200 bg-white"
            }`}
          >
            <View
              className={`absolute top-[3px] bottom-[3px] rounded-full w-[44px] ${
                isOnline ? "left-[3px] bg-emerald-500" : "right-[3px] bg-slate-300"
              }`}
            />
            <View className="flex-1 flex-row justify-between px-2.5 z-10">
              <Text className={`text-[10px] font-bold ${isOnline ? "text-white" : "text-slate-400"}`}>
                Online
              </Text>
              <Text className={`text-[10px] font-bold ${!isOnline ? "text-slate-600" : "text-slate-400"}`}>
                Offline
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Overview Stats (Orange Card Grid) */}
        <View className="bg-brand-orange p-6 rounded-3xl shadow-lg shadow-brand-orange/20 flex-row justify-between mb-6">
          {/* Revenue */}
          <View className="flex-1 items-center justify-center">
            <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-2">
              <Ionicons name="logo-usd" size={16} color="white" />
            </View>
            <Text className="text-white/80 text-[10px] font-semibold">Revenue Today</Text>
            <Text className="text-white text-base font-extrabold mt-1">1,200 USD</Text>
          </View>

          {/* Active Booking */}
          <View className="flex-1 items-center justify-center border-l border-r border-white/10">
            <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-2">
              <Ionicons name="calendar" size={16} color="white" />
            </View>
            <Text className="text-white/80 text-[10px] font-semibold">Active Booking</Text>
            <Text className="text-white text-base font-extrabold mt-1">42</Text>
          </View>

          {/* Rating */}
          <View className="flex-1 items-center justify-center">
            <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-2">
              <Ionicons name="star" size={16} color="white" />
            </View>
            <Text className="text-white/80 text-[10px] font-semibold">Rating</Text>
            <Text className="text-white text-base font-extrabold mt-1">4.8<Text className="text-white/60 text-xs font-semibold">(128)</Text></Text>
          </View>
        </View>

        {/* Section: Today's Booking */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-brand-dark text-base font-bold">Today’s Booking</Text>
            <TouchableOpacity onPress={navigateToBookingsTab}>
              <Text className="text-brand-orange text-xs font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          {/* Today's Booking cards matching screenshot */}
          <View className="gap-4">
            {todayBookings.map((booking) => (
              <View
                key={booking.id}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
              >
                {/* Customer card header */}
                <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-slate-50">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden items-center justify-center">
                      <Ionicons name="person" size={20} color="#A0AEC0" />
                    </View>
                    <View>
                      <View className="flex-row items-center gap-2">
                        <Text className="text-brand-dark text-xs font-bold">{booking.customerName}</Text>
                        <View
                          className={`px-2 py-0.5 rounded ${
                            booking.status === "Booked" ? "bg-emerald-50" : "bg-amber-50"
                          }`}
                        >
                          <Text
                            className={`text-[8px] font-bold ${
                              booking.status === "Booked" ? "text-emerald-500" : "text-amber-500"
                            }`}
                          >
                            {booking.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">
                        {booking.pickupTime}
                      </Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity className="p-1">
                    <Ionicons name="ellipsis-horizontal" size={16} color="#A0AEC0" />
                  </TouchableOpacity>
                </View>

                {/* Car details box */}
                <View className="flex-row items-center justify-between bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-16 h-12 bg-white rounded-xl border border-slate-100 overflow-hidden items-center justify-center p-1">
                      <Image source={booking.image} className="w-full h-full" resizeMode="contain" />
                    </View>
                    <View>
                      <Text className="text-brand-dark text-[11px] font-bold">{booking.carName}</Text>
                      <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">{booking.duration}</Text>
                    </View>
                  </View>
                  <Text className="text-brand-orange text-xs font-extrabold">{booking.price}<Text className="text-slate-400 text-[9px] font-semibold">/day</Text></Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
