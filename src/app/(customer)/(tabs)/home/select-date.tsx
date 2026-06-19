import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectDateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve car parameters
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

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const parseDateString = (str: string) => {
    if (!str) return null;
    const parts = str.split(" ");
    if (parts.length < 3) return null;
    const d = parseInt(parts[0]);
    const mName = parts[1]; // e.g. "Jun"
    const y = parseInt(parts[2]);

    const m = monthNames.findIndex((name) => name.toLowerCase().startsWith(mName.toLowerCase()));
    if (m === -1) return null;
    return new Date(y, m, d);
  };

  const formatDateString = (day: number, m: number, y: number) => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const monthAbbr = monthNames[m].slice(0, 3);
    return `${dayStr} ${monthAbbr} ${y}`;
  };

  const getInitialDates = () => {
    const today = new Date();
    const afterTwoDays = new Date();
    afterTwoDays.setDate(today.getDate() + 2);

    const format = (d: Date) => {
      const dayStr = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
      const monthAbbr = monthNames[d.getMonth()].slice(0, 3);
      return `${dayStr} ${monthAbbr} ${d.getFullYear()}`;
    };

    return {
      from: format(today),
      to: format(afterTwoDays),
    };
  };

  const initialDates = getInitialDates();

  // Booking details states
  const [fullName, setFullName] = useState("");
  const [fromDate, setFromDate] = useState(initialDates.from);
  const [toDate, setToDate] = useState(initialDates.to);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Calendar display state (default to today's month)
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth(); // 0-indexed

  // Month stats for grid
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const prevMonthDays = Array.from(
    { length: firstDayIndex },
    (_, i) => prevMonthTotalDays - firstDayIndex + i + 1
  );
  const octDays = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Time Slots for Dropdown
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const selectedStr = formatDateString(day, month, year);
    const selectedDateObj = new Date(year, month, day);
    const fromDateObj = parseDateString(fromDate);
    const toDateObj = parseDateString(toDate);

    if (!fromDate || (fromDate && toDate)) {
      setFromDate(selectedStr);
      setToDate("");
    } else {
      if (fromDateObj && selectedDateObj > fromDateObj) {
        setToDate(selectedStr);
      } else {
        setFromDate(selectedStr);
        setToDate("");
      }
    }
  };

  const calculateDays = () => {
    const fromDateObj = parseDateString(fromDate);
    const toDateObj = parseDateString(toDate);
    if (!fromDateObj || !toDateObj) return 1;
    const diffTime = Math.abs(toDateObj.getTime() - fromDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const handleConfirm = () => {
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    const durationDays = calculateDays();
    router.push({
      pathname: "/(customer)/(tabs)/home/booking-summary" as any,
      params: {
        id,
        title,
        price: price.toString(),
        category,
        image,
        speed,
        transmission,
        capacity,
        fuel,
        fullName,
        fromDate,
        toDate,
        selectedTime,
        durationDays: durationDays.toString(),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      className="flex-1 bg-white"
    >
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        {/* Header Bar */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2 h-16 border-b border-gray-50">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
          >
            <Ionicons name="chevron-back" size={20} color="#6A7282" />
          </TouchableOpacity>
          <Text className="text-[#1F2937] text-lg font-black">Select Date</Text>
          <View className="w-11 h-11" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}
        >
          <View className="px-6 pt-4 gap-5">
            {/* Car Overview Card */}
            <View className="bg-white border border-gray-100 rounded-2xl p-3 flex-row items-center gap-3 shadow-sm">
              <View className="w-24 h-16 bg-gray-50 rounded-xl overflow-hidden justify-center items-center">
                <Image source={{ uri: image }} className="w-full h-full" resizeMode="contain" />
              </View>
              <View className="flex-1 justify-center gap-0.5">
                <Text className="text-brand-dark font-extrabold text-sm">{title}</Text>
                <View className="flex-row items-center gap-2 mt-0.5">
                  <View className="flex-row items-center gap-0.5">
                    <Ionicons name="cog-outline" size={10} color="#9CA3AF" />
                    <Text className="text-gray-400 text-[8px] font-bold">
                      {transmission === "Automatic" ? "A" : "M"}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-0.5">
                    <Ionicons name="people-outline" size={10} color="#9CA3AF" />
                    <Text className="text-gray-400 text-[8px] font-bold">{capacity.split(" ")[0]}</Text>
                  </View>
                </View>
                <Text className="text-[#F97316] text-xs font-black mt-1">${price}/day</Text>
              </View>
            </View>

            {/* Inputs Section */}
            <View className="gap-4">
              {/* Full Name */}
              <View className="gap-1.5">
                <Text className="text-[#1F2937] text-xs font-bold">Name</Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter full name"
                  placeholderTextColor="#A0AAB9"
                  className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 text-xs text-gray-700 shadow-sm"
                />
              </View>

              {/* Date Rows */}
              <View className="flex-row justify-between gap-3" style={{ flexDirection: "row" }}>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[#1F2937] text-xs font-bold">From</Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 flex-row justify-between items-center shadow-sm"
                  >
                    <Text className="text-gray-700 text-xs font-semibold">{fromDate || "Select Date"}</Text>
                    <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[#1F2937] text-xs font-bold">To</Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 flex-row justify-between items-center shadow-sm"
                  >
                    <Text className="text-gray-700 text-xs font-semibold">{toDate || "Select Date"}</Text>
                    <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Time Dropdown Selector */}
              <View className="gap-1.5 relative z-50">
                <Text className="text-[#1F2937] text-xs font-bold">Select Time</Text>
                <TouchableOpacity
                  onPress={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 flex-row justify-between items-center shadow-sm"
                  activeOpacity={0.9}
                >
                  <Text className="text-gray-700 text-xs font-semibold">{selectedTime}</Text>
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                </TouchableOpacity>

                {showTimeDropdown && (
                  <View
                    className="absolute top-16 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-48 overflow-hidden z-50"
                    style={{ elevation: 10 }}
                  >
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
                      {timeSlots.map((slot) => (
                        <TouchableOpacity
                          key={slot}
                          onPress={() => {
                            setSelectedTime(slot);
                            setShowTimeDropdown(false);
                          }}
                          className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-50"
                        >
                          <Text className="text-gray-700 text-xs font-bold">{slot}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>

            {/* Interactive Calendar component */}
            <View className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              {/* Calendar Month Header */}
              <View className="flex-row justify-between items-center mb-5" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity onPress={handlePrevMonth} className="p-1">
                  <Ionicons name="chevron-back" size={16} color="#6A7282" />
                </TouchableOpacity>
                <Text className="text-[#1F2937] text-xs font-black">
                  {monthNames[month]} {year}
                </Text>
                <TouchableOpacity onPress={handleNextMonth} className="p-1">
                  <Ionicons name="chevron-forward" size={16} color="#6A7282" />
                </TouchableOpacity>
              </View>

              {/* Days of Week Row */}
              <View className="flex-row justify-between mb-3" style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => (
                  <Text key={dayName} className="text-gray-400 text-[10px] font-bold w-9 text-center">
                    {dayName}
                  </Text>
                ))}
              </View>

              {/* Days Grid */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                {/* Grayed out previous month days */}
                {prevMonthDays.map((d) => (
                  <View
                    key={`prev-${d}`}
                    style={{
                      width: "14.28%",
                      height: 36,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text className="text-gray-200 text-[10px] font-bold">{d}</Text>
                  </View>
                ))}

                {/* October days */}
                {octDays.map((d) => {
                  const thisDate = new Date(year, month, d);
                  const fromDateObj = parseDateString(fromDate);
                  const toDateObj = parseDateString(toDate);

                  const isStart = fromDateObj && thisDate.getTime() === fromDateObj.getTime();
                  const isEnd = toDateObj && thisDate.getTime() === toDateObj.getTime();
                  
                  // Boolean conversion to prevent React Native 0 rendering bug
                  const isInRange = !!(fromDateObj && toDateObj && thisDate > fromDateObj && thisDate < toDateObj);

                  return (
                    <TouchableOpacity
                      key={d}
                      onPress={() => handleSelectDay(d)}
                      style={{
                        width: "14.28%",
                        height: 36,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      {/* Range overlay background */}
                      {isInRange ? (
                        <View className="absolute inset-y-1.5 left-0 right-0 bg-[#F97316]/10" />
                      ) : null}

                      {/* Selected circle background */}
                      {isStart || isEnd ? (
                        <View className="absolute w-8 h-8 rounded-full bg-[#F97316] justify-center items-center" />
                      ) : null}

                      <Text
                        className={`text-[10px] font-black ${
                          isStart || isEnd
                            ? "text-white"
                            : isInRange
                            ? "text-[#F97316]"
                            : "text-[#1F2937]"
                        }`}
                      >
                        {d}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Confirm Button */}
        <View className="absolute bottom-6 left-6 right-6 z-10">
          <TouchableOpacity
            onPress={handleConfirm}
            className="w-full py-4 rounded-2xl items-center justify-center bg-[#F97316] shadow-md"
          >
            <Text className="text-white text-sm font-black">Confirm</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
