import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
  id: string;
  type: "food" | "ride" | "rental";
  title: string;
  body: string;
  time: string;
  isUnread: boolean;
}

const INITIAL_TODAY: NotificationItem[] = [
  {
    id: "t1",
    type: "food",
    title: "Order Picked Up!",
    body: "Edamame is on its way",
    time: "5m ago",
    isUnread: true,
  },
  {
    id: "t2",
    type: "ride",
    title: "Driver Arrived!",
    body: "Your driver is outside your locations",
    time: "5m ago",
    isUnread: true,
  },
  {
    id: "t3",
    type: "rental",
    title: "Booking Confirmed",
    body: "Your Toyota Camry is ready for pickup on Oct 15",
    time: "5m ago",
    isUnread: true,
  },
];

const INITIAL_YESTERDAY: NotificationItem[] = [
  {
    id: "y1",
    type: "food",
    title: "Order Picked Up!",
    body: "Edamame is on its way",
    time: "5m ago",
    isUnread: false,
  },
  {
    id: "y2",
    type: "ride",
    title: "Captain Arrived!",
    body: "Your driver is outside your locations",
    time: "5m ago",
    isUnread: false,
  },
  {
    id: "y3",
    type: "rental",
    title: "Booking Confirmed",
    body: "Your Toyota Camry is ready for pickup on Oct 15",
    time: "5m ago",
    isUnread: false,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [todayList, setTodayList] = useState<NotificationItem[]>(INITIAL_TODAY);
  const [yesterdayList, setYesterdayList] = useState<NotificationItem[]>(INITIAL_YESTERDAY);

  const handleMarkAllRead = () => {
    setTodayList((prev) => prev.map((item) => ({ ...item, isUnread: false })));
    setYesterdayList((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  const getIconConfig = (type: "food" | "ride" | "rental") => {
    switch (type) {
      case "food":
        return {
          name: "pizza" as const,
          bgColor: "bg-[#FFF7ED]",
          iconColor: "#F97316",
        };
      case "ride":
        return {
          name: "car" as const,
          bgColor: "bg-[#EFF6FF]",
          iconColor: "#3B82F6",
        };
      case "rental":
        return {
          name: "key" as const,
          bgColor: "bg-[#ECFDF5]",
          iconColor: "#10B981",
        };
    }
  };

  const renderNotificationCard = (item: NotificationItem) => {
    const config = getIconConfig(item.type);
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.8}
        className={`flex-row items-center p-4 rounded-[24px] border justify-between mb-3 ${
          item.isUnread
            ? "bg-[#F4F4F5] border-[#E4E4E7]"
            : "bg-white border-[#E4E4E7]"
        }`}
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
      >
        <View 
          className="flex-1 flex-row items-center gap-3.5"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          {/* Status Icon */}
          <View className={`w-11 h-11 rounded-2xl items-center justify-center ${config.bgColor}`}>
            <Ionicons name={config.name} size={20} color={config.iconColor} />
          </View>

          {/* Texts info */}
          <View className="flex-1 pr-2">
            <Text className="text-[#1F2937] font-bold text-sm">
              {item.title}
            </Text>
            <Text className="text-gray-400 text-xs font-semibold mt-0.5 leading-4">
              {item.body}
            </Text>
            {item.time ? (
              <Text className="text-gray-400 text-[9px] font-semibold mt-1">
                {item.time}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Right arrow */}
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* Header bar */}
      <View 
        className="flex-row items-center justify-between px-6 pt-4 pb-2 h-16 bg-white"
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm"
        >
          <Ionicons name="chevron-back" size={20} color="#6A7282" />
        </TouchableOpacity>

        <Text className="text-[#1F2937] text-lg font-bold">Notifications</Text>

        <View className="w-11 h-11" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 mt-4"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Today section */}
        <View className="mb-6">
          <View 
            className="flex-row justify-between items-center mb-4"
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <Text className="text-[#1F2937] text-sm font-extrabold">Today</Text>
            <TouchableOpacity onPress={handleMarkAllRead}>
              <Text className="text-[#F97316] text-xs font-bold">
                Mark all as read
              </Text>
            </TouchableOpacity>
          </View>
          {todayList.map(renderNotificationCard)}
        </View>

        {/* Yesterday section */}
        <View>
          <Text className="text-[#1F2937] text-sm font-extrabold mb-4">
            Yesterday
          </Text>
          {yesterdayList.map(renderNotificationCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
