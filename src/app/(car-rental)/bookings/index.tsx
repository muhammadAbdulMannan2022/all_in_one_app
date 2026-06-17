import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerRating: number;
  pickupTime: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  status: "Request" | "Active" | "Upcoming" | "Cancellation";
  carName: string;
  carSpecs: {
    fuel: string;
    transmission: string;
    seats: number;
  };
  duration: string;
  days: number;
  pricePerDay: number;
  serviceFee: number;
  insuranceFee: number;
  tax: number;
  totalPrice: number;
  image: any;
  rejectReason?: string;
}

export default function CarRentalBookings() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<
    "All" | "Request" | "Active" | "Upcoming" | "Cancellation"
  >("All");

  // Mock Bookings list
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK-8942",
      customerName: "Michel Chen",
      customerPhone: "+880 171 234 5678",
      customerEmail: "michel.chen@gmail.com",
      customerRating: 4.8,
      pickupTime: "10:00 AM",
      pickupDate: "May 20, 2026",
      returnDate: "May 25, 2026",
      pickupLocation: "Hazrat Shahjalal International Airport, Dhaka",
      returnLocation: "Tiger Pass Circle, Chittagong",
      status: "Request",
      carName: "Toyota Camry 2022",
      carSpecs: { fuel: "Hybrid", transmission: "Automatic", seats: 5 },
      duration: "5 days",
      days: 5,
      pricePerDay: 120,
      serviceFee: 50,
      insuranceFee: 40,
      tax: 30,
      totalPrice: 720,
      image: require("@/assets/images/onboarding/3.png"),
    },
    {
      id: "BK-4321",
      customerName: "David Miller",
      customerPhone: "+880 182 345 6789",
      customerEmail: "david.miller@yahoo.com",
      customerRating: 4.9,
      pickupTime: "08:30 AM",
      pickupDate: "May 18, 2026",
      returnDate: "May 21, 2026",
      pickupLocation: "GEC Circle, Chittagong",
      returnLocation: "GEC Circle, Chittagong",
      status: "Active",
      carName: "Hyundai Elantra 2021",
      carSpecs: { fuel: "Petrol", transmission: "Automatic", seats: 5 },
      duration: "3 days",
      days: 3,
      pricePerDay: 95,
      serviceFee: 30,
      insuranceFee: 25,
      tax: 15,
      totalPrice: 355,
      image: require("@/assets/images/onboarding/3.png"),
    },
    {
      id: "BK-5521",
      customerName: "Sophia Geller",
      customerPhone: "+880 191 765 4321",
      customerEmail: "sophia.g@outlook.com",
      customerRating: 4.7,
      pickupTime: "02:00 PM",
      pickupDate: "May 22, 2026",
      returnDate: "May 29, 2026",
      pickupLocation: "Agrabad Commercial Area, Chittagong",
      returnLocation: "Agrabad Commercial Area, Chittagong",
      status: "Upcoming",
      carName: "Nissan Rogue 2023",
      carSpecs: { fuel: "Petrol", transmission: "CVT", seats: 5 },
      duration: "7 days",
      days: 7,
      pricePerDay: 150,
      serviceFee: 80,
      insuranceFee: 60,
      tax: 45,
      totalPrice: 1235,
      image: require("@/assets/images/onboarding/3.png"),
    },
    {
      id: "BK-1082",
      customerName: "John Doe",
      customerPhone: "+880 155 432 1098",
      customerEmail: "john.doe@gmail.com",
      customerRating: 4.2,
      pickupTime: "11:30 AM",
      pickupDate: "May 15, 2026",
      returnDate: "May 17, 2026",
      pickupLocation: "Chawkbazar Mall, Chittagong",
      returnLocation: "Chawkbazar Mall, Chittagong",
      status: "Cancellation",
      carName: "Toyota Camry 2022",
      carSpecs: { fuel: "Hybrid", transmission: "Automatic", seats: 5 },
      duration: "2 days",
      days: 2,
      pricePerDay: 120,
      serviceFee: 50,
      insuranceFee: 40,
      tax: 30,
      totalPrice: 360,
      image: require("@/assets/images/onboarding/3.png"),
      rejectReason: "Vehicle under maintenance and unavailable.",
    },
    {
      id: "BK-3029",
      customerName: "Emily Rose",
      customerPhone: "+880 167 890 1234",
      customerEmail: "emily.rose@gmail.com",
      customerRating: 5.0,
      pickupTime: "09:00 AM",
      pickupDate: "May 19, 2026",
      returnDate: "May 23, 2026",
      pickupLocation: "Tiger Pass Circle, Chittagong",
      returnLocation: "Airport Railway Station, Dhaka",
      status: "Active",
      carName: "Toyota Camry 2022",
      carSpecs: { fuel: "Hybrid", transmission: "Automatic", seats: 5 },
      duration: "4 days",
      days: 4,
      pricePerDay: 120,
      serviceFee: 50,
      insuranceFee: 40,
      tax: 30,
      totalPrice: 600,
      image: require("@/assets/images/onboarding/3.png"),
    },
  ]);

  // Selected booking for Details Overlay
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Rejection modal state
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectingBookingId, setRejectingBookingId] = useState<string | null>(null);
  const [customRejectReason, setCustomRejectReason] = useState("");
  const [selectedPresetReason, setSelectedPresetReason] = useState("");

  const presetReasons = [
    "Vehicle under maintenance",
    "Pricing error in listing",
    "Customer safety/rating concern",
    "Overlap with previous booking",
  ];

  // Helper counts
  const getCount = (status: string) => {
    if (status === "All") return bookings.length;
    return bookings.filter((b) => b.status === status).length;
  };

  const handleAcceptBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Active" } : b))
    );
    // If the overlay is open, update the selected booking
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: "Active" } : null));
    }
    Alert.alert("Booking Accepted", `Booking ${id} is now Active.`);
  };

  const handleCompleteTrip = (id: string) => {
    Alert.alert("Complete Trip", "Are you sure you want to mark this trip as completed?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Completed",
        onPress: () => {
          // In a real app we'd archive or complete it, for demo we update to Completed status or keep it
          setBookings((prev) => prev.filter((b) => b.id !== id));
          if (selectedBooking && selectedBooking.id === id) {
            setSelectedBooking(null);
          }
          Alert.alert("Trip Completed", `Vehicle from booking ${id} has been returned safely.`);
        },
      },
    ]);
  };

  const handleOpenRejectModal = (id: string) => {
    setRejectingBookingId(id);
    setSelectedPresetReason("");
    setCustomRejectReason("");
    setIsRejectModalOpen(true);
  };

  const handleConfirmRejection = () => {
    const reason = selectedPresetReason === "Other" ? customRejectReason : selectedPresetReason;
    if (!reason) {
      Alert.alert("Missing Reason", "Please select or type a rejection reason.");
      return;
    }

    if (rejectingBookingId) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === rejectingBookingId
            ? { ...b, status: "Cancellation", rejectReason: reason }
            : b
        )
      );

      // Close overlays
      setIsRejectModalOpen(false);
      if (selectedBooking && selectedBooking.id === rejectingBookingId) {
        setSelectedBooking((prev) =>
          prev ? { ...prev, status: "Cancellation", rejectReason: reason } : null
        );
      }
      Alert.alert("Booking Rejected", `Booking ${rejectingBookingId} has been cancelled.`);
      setRejectingBookingId(null);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (selectedTab === "All") return true;
    return b.status === selectedTab;
  });

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
        <TouchableOpacity onPress={() => router.replace("/(car-rental)/dashboard" as any)}>
          <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
        </TouchableOpacity>
        <Text className="text-brand-dark text-base font-bold">Bookings Management</Text>
        <View className="w-6" />
      </View>

      {/* Horizontal Tabs Filter */}
      <View className="bg-white py-3 border-b border-slate-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
        >
          {(["All", "Request", "Active", "Upcoming", "Cancellation"] as const).map((tab) => {
            const isActive = selectedTab === tab;
            const count = getCount(tab);
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className={`flex-row items-center px-4 py-2 rounded-full border ${
                  isActive
                    ? "bg-brand-orange border-brand-orange"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${isActive ? "text-white" : "text-brand-gray"}`}
                >
                  {tab}
                </Text>
                <View
                  className={`ml-2 px-1.5 py-0.5 rounded-full items-center justify-center ${
                    isActive ? "bg-white/20" : "bg-slate-200"
                  }`}
                >
                  <Text
                    className={`text-[9px] font-extrabold ${
                      isActive ? "text-white" : "text-brand-gray"
                    }`}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
        {filteredBookings.length === 0 ? (
          <View className="items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 p-6">
            <View className="w-16 h-16 rounded-full bg-slate-50 items-center justify-center mb-4">
              <Ionicons name="calendar-outline" size={32} color="#A0AEC0" />
            </View>
            <Text className="text-brand-dark font-bold text-sm">No Bookings Found</Text>
            <Text className="text-brand-gray text-[10px] text-center mt-1">
              There are no bookings matching the "{selectedTab}" filter status.
            </Text>
          </View>
        ) : (
          <View className="gap-5 mb-12">
            {filteredBookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                onPress={() => setSelectedBooking(booking)}
                activeOpacity={0.9}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
              >
                {/* Header row */}
                <View className="flex-row items-center justify-between pb-3 border-b border-slate-50 mb-3.5">
                  <View className="flex-row items-center gap-3">
                    <View className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center">
                      <Ionicons name="person" size={18} color="#A0AEC0" />
                    </View>
                    <View>
                      <View className="flex-row items-center gap-2">
                        <Text className="text-brand-dark text-xs font-bold">
                          {booking.customerName}
                        </Text>
                        <View
                          className={`px-2 py-0.5 rounded ${
                            booking.status === "Request"
                              ? "bg-amber-50"
                              : booking.status === "Active"
                              ? "bg-emerald-50"
                              : booking.status === "Upcoming"
                              ? "bg-blue-50"
                              : "bg-red-50"
                          }`}
                        >
                          <Text
                            className={`text-[8px] font-bold ${
                              booking.status === "Request"
                                ? "text-amber-500"
                                : booking.status === "Active"
                                ? "text-emerald-500"
                                : booking.status === "Upcoming"
                                ? "text-blue-500"
                                : "text-red-500"
                            }`}
                          >
                            {booking.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-brand-gray text-[8px] font-semibold mt-0.5">
                        ID: {booking.id}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-brand-gray text-[9px] font-bold">
                    {booking.pickupDate}
                  </Text>
                </View>

                {/* Car and Booking Rent Box */}
                <View className="flex-row items-center gap-3 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl mb-4">
                  <View className="w-16 h-12 bg-white rounded-xl border border-slate-100 overflow-hidden items-center justify-center p-1">
                    <Image source={booking.image} className="w-full h-full" resizeMode="contain" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-[11px] font-bold">
                      {booking.carName}
                    </Text>
                    <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">
                      Duration: {booking.duration}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-brand-orange text-xs font-extrabold">
                      ${booking.pricePerDay}
                      <Text className="text-slate-400 text-[9px] font-semibold">/day</Text>
                    </Text>
                    <Text className="text-slate-400 text-[8px] font-semibold mt-0.5">
                      Total: ${booking.totalPrice}
                    </Text>
                  </View>
                </View>

                {/* Action buttons on card */}
                {booking.status === "Request" && (
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => handleOpenRejectModal(booking.id)}
                      className="flex-1 py-3 bg-slate-100 border border-slate-200 rounded-xl items-center justify-center"
                    >
                      <Text className="text-brand-dark text-xs font-bold">Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAcceptBooking(booking.id)}
                      className="flex-1 py-3 bg-brand-orange rounded-xl items-center justify-center"
                    >
                      <Text className="text-white text-xs font-bold">Accept</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {booking.status === "Active" && (
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("Track Vehicle", "Tracking customer location on map...")
                      }
                      className="flex-1 py-3 bg-slate-50 border border-slate-200 rounded-xl flex-row items-center justify-center gap-1.5"
                    >
                      <Ionicons name="map-outline" size={14} color="#2E2E2D" />
                      <Text className="text-brand-dark text-xs font-bold">Track GPS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleCompleteTrip(booking.id)}
                      className="flex-1 py-3 bg-brand-orange rounded-xl flex-row items-center justify-center gap-1.5"
                    >
                      <Ionicons name="checkmark-circle-outline" size={14} color="white" />
                      <Text className="text-white text-xs font-bold">Complete Trip</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {booking.status === "Upcoming" && (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert("Prepare Vehicle", "Sending checklist instructions to staff.")
                    }
                    className="w-full py-3 bg-[#E4792F]/10 border border-brand-orange/20 rounded-xl items-center justify-center"
                  >
                    <Text className="text-brand-orange text-xs font-bold">Prepare Vehicle</Text>
                  </TouchableOpacity>
                )}

                {booking.status === "Cancellation" && booking.rejectReason && (
                  <View className="bg-red-50 border border-red-100 rounded-2xl p-3">
                    <Text className="text-red-500 text-[10px] font-bold">Rejection Reason:</Text>
                    <Text className="text-brand-gray text-[9px] mt-0.5 font-semibold">
                      {booking.rejectReason}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Booking Details Overlay Modal */}
      <Modal
        visible={selectedBooking !== null}
        animationType="slide"
        onRequestClose={() => setSelectedBooking(null)}
      >
        <SafeAreaView className="flex-1 bg-brand-bg">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setSelectedBooking(null)}>
              <Ionicons name="close" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Booking Details</Text>
            <View className="w-6" />
          </View>

          {selectedBooking && (
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
              {/* Customer Profile Card */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6 items-center">
                <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center mb-3">
                  <Ionicons name="person" size={32} color="#A0AEC0" />
                </View>
                <Text className="text-brand-dark text-base font-bold">
                  {selectedBooking.customerName}
                </Text>
                <View className="flex-row items-center gap-1.5 mt-1.5">
                  <Ionicons name="star" size={14} color="#E4792F" />
                  <Text className="text-brand-dark text-xs font-bold">
                    {selectedBooking.customerRating}
                  </Text>
                  <Text className="text-brand-gray text-[10px] font-semibold">(45 rentals)</Text>
                </View>

                {/* Quick Info Grid */}
                <View className="flex-row gap-6 mt-5 border-t border-slate-50 pt-4 w-full justify-around">
                  <View className="items-center">
                    <Ionicons name="call-outline" size={16} color="#6A7282" />
                    <Text className="text-brand-gray text-[9px] font-bold mt-1">Phone</Text>
                    <Text className="text-brand-dark text-[10px] font-bold mt-0.5">
                      {selectedBooking.customerPhone}
                    </Text>
                  </View>
                  <View className="items-center border-l border-slate-50 pl-6">
                    <Ionicons name="mail-outline" size={16} color="#6A7282" />
                    <Text className="text-brand-gray text-[9px] font-bold mt-1">Email</Text>
                    <Text className="text-brand-dark text-[10px] font-bold mt-0.5">
                      {selectedBooking.customerEmail}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Vehicle Spec Card */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
                <Text className="text-brand-dark text-xs font-bold mb-3">Vehicle Details</Text>
                <View className="flex-row items-center gap-4 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl mb-4">
                  <View className="w-20 h-14 bg-white rounded-xl border border-slate-100 overflow-hidden items-center justify-center p-1">
                    <Image
                      source={selectedBooking.image}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-brand-dark text-xs font-bold">
                      {selectedBooking.carName}
                    </Text>
                    <Text className="text-brand-orange text-xs font-extrabold mt-1">
                      ${selectedBooking.pricePerDay}
                      <Text className="text-slate-400 text-[9px] font-semibold">/day</Text>
                    </Text>
                  </View>
                </View>

                {/* Mini Badges Grid */}
                <View className="flex-row justify-between">
                  <View className="flex-1 flex-row items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl justify-center mr-2">
                    <Ionicons name="leaf-outline" size={12} color="#E4792F" />
                    <Text className="text-brand-dark text-[10px] font-bold">
                      {selectedBooking.carSpecs.fuel}
                    </Text>
                  </View>
                  <View className="flex-1 flex-row items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl justify-center mr-2">
                    <Ionicons name="cog-outline" size={12} color="#E4792F" />
                    <Text className="text-brand-dark text-[10px] font-bold" numberOfLines={1}>
                      {selectedBooking.carSpecs.transmission}
                    </Text>
                  </View>
                  <View className="flex-1 flex-row items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl justify-center">
                    <Ionicons name="people-outline" size={12} color="#E4792F" />
                    <Text className="text-brand-dark text-[10px] font-bold">
                      {selectedBooking.carSpecs.seats} seats
                    </Text>
                  </View>
                </View>
              </View>

              {/* Rental Duration Details */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
                <Text className="text-brand-dark text-xs font-bold mb-3">Rental Schedule</Text>
                <View className="flex-row items-center justify-between pb-3 border-b border-slate-50">
                  <View>
                    <Text className="text-brand-gray text-[9px] font-bold">PICK UP</Text>
                    <Text className="text-brand-dark text-xs font-bold mt-1">
                      {selectedBooking.pickupDate}
                    </Text>
                    <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">
                      at {selectedBooking.pickupTime}
                    </Text>
                  </View>
                  <View className="w-10 h-10 rounded-full bg-orange-50 items-center justify-center">
                    <Ionicons name="arrow-forward" size={18} color="#E4792F" />
                  </View>
                  <View className="items-end">
                    <Text className="text-brand-gray text-[9px] font-bold">RETURN</Text>
                    <Text className="text-brand-dark text-xs font-bold mt-1">
                      {selectedBooking.returnDate}
                    </Text>
                    <Text className="text-brand-gray text-[9px] font-semibold mt-0.5">
                      at 12:00 PM
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-between pt-3">
                  <Text className="text-brand-dark text-xs font-bold">Total Duration</Text>
                  <Text className="text-brand-orange text-xs font-extrabold">
                    {selectedBooking.duration}
                  </Text>
                </View>
              </View>

              {/* Addresses details */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
                <Text className="text-brand-dark text-xs font-bold mb-3">Locations</Text>
                <View className="gap-4">
                  <View className="flex-row gap-3">
                    <View className="w-6 h-6 rounded-full bg-emerald-50 items-center justify-center mt-0.5">
                      <Ionicons name="pin" size={12} color="#10B981" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-[10px] font-bold">Pickup Location</Text>
                      <Text className="text-brand-gray text-[10px] font-semibold mt-0.5 leading-4">
                        {selectedBooking.pickupLocation}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-3">
                    <View className="w-6 h-6 rounded-full bg-red-50 items-center justify-center mt-0.5">
                      <Ionicons name="pin" size={12} color="#EF4444" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-[10px] font-bold">Return Location</Text>
                      <Text className="text-brand-gray text-[10px] font-semibold mt-0.5 leading-4">
                        {selectedBooking.returnLocation}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Invoices Breakdown */}
              <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-12">
                <Text className="text-brand-dark text-xs font-bold mb-4">Payment Invoice</Text>
                <View className="gap-3.5 pb-4 border-b border-slate-50">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">
                      Car Rent Fee (${selectedBooking.pricePerDay} x {selectedBooking.days} days)
                    </Text>
                    <Text className="text-brand-dark text-xs font-bold">
                      ${selectedBooking.pricePerDay * selectedBooking.days}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Service Fee</Text>
                    <Text className="text-brand-dark text-xs font-bold">
                      +${selectedBooking.serviceFee}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Insurance Fee</Text>
                    <Text className="text-brand-dark text-xs font-bold">
                      +${selectedBooking.insuranceFee}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-brand-gray text-xs font-semibold">Government Tax (VAT)</Text>
                    <Text className="text-brand-dark text-xs font-bold">
                      +${selectedBooking.tax}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center pt-4">
                  <Text className="text-brand-dark text-sm font-bold">Total Amount</Text>
                  <Text className="text-brand-orange text-base font-extrabold">
                    ${selectedBooking.totalPrice}
                  </Text>
                </View>
              </View>

              {/* Status specific actions in sheet */}
              {selectedBooking.status === "Request" && (
                <View className="flex-row gap-4 mb-12">
                  <TouchableOpacity
                    onPress={() => handleOpenRejectModal(selectedBooking.id)}
                    className="flex-1 py-4 bg-slate-100 border border-slate-200 rounded-2xl items-center justify-center"
                  >
                    <Text className="text-brand-dark text-sm font-bold">Reject Request</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleAcceptBooking(selectedBooking.id)}
                    className="flex-1 py-4 bg-brand-orange rounded-2xl items-center justify-center"
                  >
                    <Text className="text-white text-sm font-bold">Accept Request</Text>
                  </TouchableOpacity>
                </View>
              )}

              {selectedBooking.status === "Active" && (
                <TouchableOpacity
                  onPress={() => handleCompleteTrip(selectedBooking.id)}
                  className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mb-12"
                >
                  <Text className="text-white text-sm font-bold">Mark Trip as Completed</Text>
                </TouchableOpacity>
              )}

              {selectedBooking.status === "Cancellation" && selectedBooking.rejectReason && (
                <View className="bg-red-50 border border-red-100 rounded-3xl p-5 mb-12">
                  <Text className="text-red-500 text-xs font-bold mb-1">Rejection Reason</Text>
                  <Text className="text-brand-gray text-xs leading-5">
                    {selectedBooking.rejectReason}
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

      {/* Reject Reason Dialog Modal */}
      <Modal
        visible={isRejectModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsRejectModalOpen(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="w-full bg-white rounded-3xl p-6 shadow-xl max-h-[80%]">
            <View className="flex-row items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <Text className="text-brand-dark text-base font-bold">Reject Booking</Text>
              <TouchableOpacity onPress={() => setIsRejectModalOpen(false)}>
                <Ionicons name="close" size={20} color="#2E2E2D" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
              <Text className="text-brand-gray text-xs font-semibold mb-3">
                Please select a reason for rejecting this booking:
              </Text>

              {/* Preset buttons */}
              <View className="gap-2.5 mb-4">
                {presetReasons.map((reason) => {
                  const isSelected = selectedPresetReason === reason;
                  return (
                    <TouchableOpacity
                      key={reason}
                      onPress={() => setSelectedPresetReason(reason)}
                      className={`w-full p-3.5 rounded-2xl border ${
                        isSelected
                          ? "bg-orange-50 border-brand-orange"
                          : "bg-slate-50 border-slate-100"
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          isSelected ? "text-brand-orange" : "text-brand-dark"
                        }`}
                      >
                        {reason}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity
                  onPress={() => setSelectedPresetReason("Other")}
                  className={`w-full p-3.5 rounded-2xl border ${
                    selectedPresetReason === "Other"
                      ? "bg-orange-50 border-brand-orange"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      selectedPresetReason === "Other" ? "text-brand-orange" : "text-brand-dark"
                    }`}
                  >
                    Other...
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Custom Reason TextInput */}
              {selectedPresetReason === "Other" && (
                <View className="gap-1.5 mb-2">
                  <Text className="text-[10px] font-bold text-brand-dark mb-1">Custom Reason</Text>
                  <TextInput
                    value={customRejectReason}
                    onChangeText={setCustomRejectReason}
                    placeholder="Enter details..."
                    placeholderTextColor="#A0AEC0"
                    multiline
                    numberOfLines={3}
                    className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-4 py-3 text-brand-dark text-xs font-semibold min-h-[80px] text-left"
                  />
                </View>
              )}
            </ScrollView>

            {/* Cancel & Confirm buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setIsRejectModalOpen(false)}
                className="flex-1 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center"
              >
                <Text className="text-brand-dark text-xs font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmRejection}
                className="flex-1 py-3.5 bg-red-500 rounded-2xl items-center justify-center"
              >
                <Text className="text-white text-xs font-bold">Confirm Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
