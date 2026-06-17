import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
  isReplying?: boolean;
}

export default function CarRentalProfile() {
  const router = useRouter();

  // Screens: "main", "fleet-details", "fleet-wizard-1", "fleet-wizard-2", "fleet-wizard-3", "reviews", "security", "terms", "help"
  const [activeScreen, setActiveScreen] = useState<
    | "main"
    | "fleet-details"
    | "fleet-wizard-1"
    | "fleet-wizard-2"
    | "fleet-wizard-3"
    | "reviews"
    | "security"
    | "terms"
    | "help"
  >("main");

  // State Management
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Fleet Owner Details Data
  const [fleetName, setFleetName] = useState("Nexora DriveHub");
  const [fleetAddress, setFleetAddress] = useState("102/B Fashion Plaza, Tiger Pass, Chittagong");
  const [fleetPhone, setFleetPhone] = useState("+880 171 234 5678");
  const [fleetEmail, setFleetEmail] = useState("contact@nexoradrive.com");
  const [fleetAbout, setFleetAbout] = useState(
    "Nexora DriveHub is a premium vehicle fleet operator. We provide clean, modern passenger cars, SUVs, and executive transport solutions. With round-the-clock roadside assistance and fully insured vehicles, we guarantee an exceptional, stress-free driving experience."
  );
  const [fleetHours, setFleetHours] = useState("08:00 AM - 10:00 PM");

  // Temporary wizard state
  const [tempName, setTempName] = useState(fleetName);
  const [tempPhone, setTempPhone] = useState(fleetPhone);
  const [tempEmail, setTempEmail] = useState(fleetEmail);
  const [tempAbout, setTempAbout] = useState(fleetAbout);
  const [tempAddress, setTempAddress] = useState(fleetAddress);
  const [tempRoad, setTempRoad] = useState("Tiger Pass");
  const [tempHouse, setTempHouse] = useState("102/B");
  const [tempFloor, setTempFloor] = useState("2nd Floor");
  const [tempCity, setTempCity] = useState("Chittagong");
  const [tempDistrict, setTempDistrict] = useState("Chittagong");
  const [tempPostal, setTempPostal] = useState("4000");
  const [tempOpening, setTempOpening] = useState("08:00 AM");
  const [tempClosing, setTempClosing] = useState("10:00 PM");

  // Upload States
  const [wizardLogo, setWizardLogo] = useState<string | null>("fleet_logo.png");
  const [wizardBanner, setWizardBanner] = useState<string | null>("fleet_banner.png");
  const [tradeLicense, setTradeLicense] = useState<{ name: string; size: string } | null>({
    name: "fleet_permit_license.pdf",
    size: "2.1 MB",
  });
  const [uploadingLicense, setUploadingLicense] = useState(false);

  // Security Form States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // Reviews List
  const [reviews, setReviews] = useState<Review[]>(
    [
      {
        id: "1",
        name: "Michel Chen",
        rating: 5,
        date: "Today",
        comment: "Excellent service! The Toyota Camry was spotless and ran smoothly. The pick-up and drop-off process was exceptionally fast. Highly recommended!",
      },
      {
        id: "2",
        name: "David Miller",
        rating: 5,
        date: "3 days ago",
        comment: "Good vehicles and helpful customer service. Will rent from them again next time I visit Chittagong.",
      },
      {
        id: "3",
        name: "Sophia Geller",
        rating: 4,
        date: "1 week ago",
        comment: "Vehicle was in perfect condition. Clean interior. Only tiny issue was a slight delay at the airport handover, but otherwise a 5-star experience.",
      },
    ]
  );

  const [replyText, setReplyText] = useState("");

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          router.replace("/(auth)/login" as any);
        },
      },
    ]);
  };

  const handleStartWizard = () => {
    setTempName(fleetName);
    setTempPhone(fleetPhone);
    setTempEmail(fleetEmail);
    setTempAbout(fleetAbout);
    setActiveScreen("fleet-wizard-1");
  };

  const handleWizardSubmit = () => {
    setFleetName(tempName);
    setFleetPhone(tempPhone);
    setFleetEmail(tempEmail);
    setFleetAbout(tempAbout);
    setFleetAddress(tempAddress);
    setFleetHours(`${tempOpening} - ${tempClosing}`);
    setActiveScreen("fleet-details");
    Alert.alert("Success", "Fleet Information updated successfully!");
  };

  const simulateDocUpload = () => {
    setUploadingLicense(true);
    setTimeout(() => {
      setTradeLicense({ name: "fleet_permit_renewed.pdf", size: "2.4 MB" });
      setUploadingLicense(false);
    }, 1200);
  };

  const handleSavePassword = () => {
    if (!oldPassword || !newPassword || !currentPassword) {
      Alert.alert("Error", "All password fields are required.");
      return;
    }
    setOldPassword("");
    setNewPassword("");
    setCurrentPassword("");
    setActiveScreen("main");
    Alert.alert("Success", "Password updated successfully!");
  };

  const handleToggleReply = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isReplying: !r.isReplying } : r))
    );
    setReplyText("");
  };

  const handleSubmitReply = (id: string) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, reply: replyText, isReplying: false } : r
      )
    );
    Alert.alert("Success", "Reply posted.");
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* -------------------- 1. PROFILE MAIN SCREEN -------------------- */}
      {activeScreen === "main" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(car-rental)/dashboard" as any)}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Fleet Profile</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Profile Card */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm items-center mb-6 relative">
              <View className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 bg-[#FFF5F0] items-center justify-center mb-4 relative">
                <Ionicons name="car-sport" size={42} color="#E4792F" />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-white border border-slate-100 w-6 h-6 rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="create" size={12} color="#E4792F" />
                </TouchableOpacity>
              </View>
              <Text className="text-brand-dark text-base font-bold">{fleetName}</Text>
              <Text className="text-brand-gray text-xs mt-1">Narayanganj, Sadar</Text>
            </View>

            {/* Menu options list */}
            <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 gap-2">
              {/* Fleet Profile Details */}
              <TouchableOpacity
                onPress={() => setActiveScreen("fleet-details")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="business-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Fleet Hub Details</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              {/* Security */}
              <TouchableOpacity
                onPress={() => setActiveScreen("security")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="lock-closed-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Security</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              {/* Notification Toggle */}
              <View className="flex-row justify-between items-center py-3 border-b border-slate-50">
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="notifications-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Notification Alerts</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#E2E8F0", true: "#fed7aa" }}
                  thumbColor={notificationsEnabled ? "#E4792F" : "#A0AEC0"}
                />
              </View>

              {/* Help & Support */}
              <TouchableOpacity
                onPress={() => setActiveScreen("help")}
                className="flex-row justify-between items-center py-3.5 border-b border-slate-50"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="help-circle-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>

              {/* Terms & Conditions */}
              <TouchableOpacity
                onPress={() => setActiveScreen("terms")}
                className="flex-row justify-between items-center py-3.5"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-orange-50 p-2 rounded-xl">
                    <Ionicons name="document-text-outline" size={18} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-xs font-bold">Terms & Conditions</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            {/* Logout button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="border border-brand-orange rounded-3xl py-4 flex-row items-center justify-center gap-2 mb-12"
            >
              <Ionicons name="log-out-outline" size={18} color="#E4792F" />
              <Text className="text-brand-orange font-bold text-xs">Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 2. FLEET DETAILS SCREEN -------------------- */}
      {activeScreen === "fleet-details" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Fleet Hub Details</Text>
            <TouchableOpacity
              onPress={handleStartWizard}
              className="flex-row items-center gap-0.5 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full"
            >
              <Ionicons name="create-outline" size={12} color="#E4792F" />
              <Text className="text-brand-dark text-[10px] font-bold">Edit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Title */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-brand-dark text-lg font-bold">{fleetName}</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Ionicons name="location-sharp" size={14} color="#6A7282" />
                  <Text className="text-brand-gray text-xs font-semibold">{fleetAddress}</Text>
                </View>
              </View>
              <View className="bg-orange-50 border border-brand-orange/20 px-3 py-1 rounded-full">
                <Text className="text-brand-orange text-[10px] font-bold">Fleet</Text>
              </View>
            </View>

            {/* Banner picture mock */}
            <View className="w-full h-44 rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 mb-5 relative justify-end">
              <View className="absolute inset-0 bg-slate-200" />
              <View className="absolute top-4 left-4 bg-brand-dark/50 px-3 py-1 rounded-full flex-row items-center gap-1">
                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                <Text className="text-white text-[9px] font-bold">Open  {fleetHours}</Text>
              </View>
            </View>

            {/* Description About */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
              <Text className="text-brand-dark text-xs font-bold mb-2">About Our Fleet</Text>
              <Text className="text-brand-gray text-[11px] leading-5 font-semibold">
                {fleetAbout}
              </Text>
              
              <TouchableOpacity
                onPress={() => setActiveScreen("reviews")}
                className="flex-row items-center gap-1.5 mt-5 border-t border-slate-50 pt-4"
              >
                <Ionicons name="star" size={16} color="#E4792F" />
                <Text className="text-brand-dark text-xs font-bold">
                  Rating <Text className="text-brand-gray font-medium">4.8 (128 Reviews)</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Contact details */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-12 gap-3">
              <Text className="text-brand-dark text-xs font-bold mb-1">Contact Details</Text>
              <View className="flex-row items-center gap-3">
                <Ionicons name="call-outline" size={16} color="#6A7282" />
                <Text className="text-brand-dark text-xs font-semibold">{fleetPhone}</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="mail-outline" size={16} color="#6A7282" />
                <Text className="text-brand-dark text-xs font-semibold">{fleetEmail}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 3. WIZARD STEP 1: BASIC INFO -------------------- */}
      {activeScreen === "fleet-wizard-1" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("fleet-details")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Fleet Info Wizard</Text>
            <View className="w-6" />
          </View>

          {/* Steps Indicator Progress line */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-slate-200 rounded-full w-[30%]" />
            <View className="h-1.5 bg-slate-200 rounded-full w-[30%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-6">
              <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-3">
                <Ionicons name="business-outline" size={28} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Basic Fleet Info</Text>
              <Text className="text-brand-gray text-[10px] text-center mt-1">Enter your fleet agency basic details</Text>
            </View>

            <View className="gap-4 mb-12">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Agency Logo</Text>
                <View className="flex-row gap-3 items-center">
                  <TouchableOpacity className="border border-slate-200 bg-white px-4 py-2.5 rounded-xl">
                    <Text className="text-brand-dark text-xs font-semibold">Choose file</Text>
                  </TouchableOpacity>
                  {wizardLogo && <Text className="text-brand-gray text-[10px] font-semibold">{wizardLogo}</Text>}
                </View>
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Agency Name</Text>
                <TextInput
                  value={tempName}
                  onChangeText={setTempName}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Contact Phone</Text>
                <TextInput
                  value={tempPhone}
                  onChangeText={setTempPhone}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Email Address</Text>
                <TextInput
                  value={tempEmail}
                  onChangeText={setTempEmail}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Fleet Bio</Text>
                <TextInput
                  value={tempAbout}
                  onChangeText={setTempAbout}
                  multiline
                  numberOfLines={4}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold min-h-[100px] text-left"
                />
              </View>

              {/* Continue button */}
              <TouchableOpacity
                onPress={() => setActiveScreen("fleet-wizard-2")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
              >
                <Text className="text-white text-base font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 4. WIZARD STEP 2: HQ LOCATION -------------------- */}
      {activeScreen === "fleet-wizard-2" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("fleet-wizard-1")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Fleet Info Wizard</Text>
            <View className="w-6" />
          </View>

          {/* Steps Indicator Progress line */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-slate-200 rounded-full w-[30%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-5">
              <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-3">
                <Ionicons name="location-outline" size={28} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">HQ Location</Text>
              <Text className="text-brand-gray text-[10px] text-center mt-1">Set your central garage / office headquarters location</Text>
            </View>

            {/* Map pin simulation */}
            <View className="w-full h-44 rounded-2xl border border-gray-200 overflow-hidden bg-[#E5F1F6] relative justify-center items-center mb-5">
              <View className="absolute w-[200%] h-3 bg-[#D3E8F0] rotate-12 top-10" />
              <View className="absolute w-[200%] h-4 bg-[#D3E8F0] -rotate-45 bottom-12" />
              <View className="items-center justify-center z-10">
                <View className="w-8 h-8 rounded-full bg-brand-orange/30 items-center justify-center absolute scale-150" />
                <Ionicons name="location" size={32} color="#E4792F" />
              </View>
            </View>

            {/* Address fields */}
            <View className="gap-4 mb-12">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Headquarters Address</Text>
                <TextInput
                  value={tempAddress}
                  onChangeText={setTempAddress}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Road Name</Text>
                  <TextInput
                    value={tempRoad}
                    onChangeText={setTempRoad}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Building No</Text>
                  <TextInput
                    value={tempHouse}
                    onChangeText={setTempHouse}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">City</Text>
                  <TextInput
                    value={tempCity}
                    onChangeText={setTempCity}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Postal Code</Text>
                  <TextInput
                    value={tempPostal}
                    onChangeText={setTempPostal}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Opening Time</Text>
                  <TextInput
                    value={tempOpening}
                    onChangeText={setTempOpening}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-[10px] font-bold text-brand-dark">Closing Time</Text>
                  <TextInput
                    value={tempClosing}
                    onChangeText={setTempClosing}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                  />
                </View>
              </View>

              {/* Continue button */}
              <TouchableOpacity
                onPress={() => setActiveScreen("fleet-wizard-3")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
              >
                <Text className="text-white text-base font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 5. WIZARD STEP 3: LEGAL DOCUMENTS -------------------- */}
      {activeScreen === "fleet-wizard-3" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("fleet-wizard-2")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Fleet Info Wizard</Text>
            <View className="w-6" />
          </View>

          {/* Steps Indicator Progress line */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
            <View className="h-1.5 bg-brand-orange rounded-full w-[30%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="items-center mb-5">
              <View className="w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-3">
                <Ionicons name="document-text-outline" size={28} color="#E4792F" />
              </View>
              <Text className="text-brand-dark text-base font-bold">Fleet License permits</Text>
              <Text className="text-brand-gray text-[10px] text-center mt-1">Upload required legal transport operator permits to finish registration</Text>
            </View>

            <View className="gap-5 mb-12">
              <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between shadow-sm">
                <View className="flex-1 mr-4">
                  <Text className="text-brand-dark text-xs font-bold">Fleet Transport Operator License</Text>
                  <Text className="text-brand-gray text-[9px] mt-0.5" numberOfLines={1}>
                    {tradeLicense
                      ? `${tradeLicense.name} (${tradeLicense.size})`
                      : "Upload agency registration documents"}
                  </Text>
                </View>
                {uploadingLicense ? (
                  <ActivityIndicator size="small" color="#E4792F" className="p-2" />
                ) : tradeLicense ? (
                  <TouchableOpacity
                    onPress={() => setTradeLicense(null)}
                    className="bg-red-50 p-2.5 rounded-full"
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={simulateDocUpload}
                    className="bg-brand-orange/10 p-2.5 rounded-full"
                  >
                    <Ionicons name="arrow-up" size={18} color="#E4792F" />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                onPress={handleWizardSubmit}
                disabled={!tradeLicense}
                className={`w-full py-4 rounded-2xl items-center justify-center mt-4 ${
                  tradeLicense ? "bg-brand-orange" : "bg-brand-gray/30"
                }`}
              >
                <Text className="text-white text-base font-bold">Finish & Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 6. RATINGS & REVIEWS SCREEN -------------------- */}
      {activeScreen === "reviews" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("fleet-details")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Reviews & Ratings</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex-row items-center justify-between mb-6">
              <View className="items-center justify-center w-[30%]">
                <Text className="text-brand-dark text-3xl font-extrabold">4.8</Text>
                <Text className="text-brand-gray text-[9px] font-semibold mt-1">128 Reviews</Text>
              </View>

              <View className="flex-1 gap-1 pl-4 border-l border-slate-50">
                {[5, 4, 3, 2, 1].map((stars, idx) => {
                  const widths = ["85%", "10%", "5%", "0%", "0%"];
                  const counts = [112, 12, 4, 0, 0];
                  return (
                    <View key={stars} className="flex-row items-center gap-2">
                      <Text className="text-[9px] text-brand-dark font-bold w-2">{stars}</Text>
                      <Ionicons name="star" size={8} color="#E4792F" />
                      <View className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <View style={{ width: widths[idx] as any }} className="h-full bg-[#E4792F]" />
                      </View>
                      <Text className="text-[8px] text-brand-gray font-semibold w-6 text-right">
                        {counts[idx]}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* List of reviews */}
            <View className="gap-4 mb-12">
              {reviews.map((rev) => (
                <View key={rev.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-2">
                      <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center">
                        <Ionicons name="person" size={16} color="#A0AEC0" />
                      </View>
                      <View>
                        <Text className="text-brand-dark text-xs font-bold">{rev.name}</Text>
                        <Text className="text-brand-gray text-[8px] font-semibold">{rev.date}</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={10}
                          color={i < rev.rating ? "#E4792F" : "#E2E8F0"}
                        />
                      ))}
                    </View>
                  </View>

                  <Text className="text-brand-dark text-[11px] leading-5 mt-2.5 font-medium">
                    {rev.comment}
                  </Text>

                  {/* Existing Reply */}
                  {rev.reply && (
                    <View className="bg-slate-50 border border-slate-100 p-3 rounded-2xl mt-3">
                      <Text className="text-brand-orange text-[9px] font-bold">Your Response:</Text>
                      <Text className="text-brand-dark text-[10px] mt-0.5 leading-4 font-semibold">
                        {rev.reply}
                      </Text>
                    </View>
                  )}

                  {/* Reply Button / Box */}
                  {!rev.reply && !rev.isReplying && (
                    <TouchableOpacity
                      onPress={() => handleToggleReply(rev.id)}
                      className="flex-row items-center gap-1 mt-3 self-end"
                    >
                      <Ionicons name="chatbubble-ellipses-outline" size={14} color="#E4792F" />
                      <Text className="text-brand-orange text-[10px] font-bold">Reply</Text>
                    </TouchableOpacity>
                  )}

                  {rev.isReplying && (
                    <View className="mt-3 gap-2">
                      <TextInput
                        value={replyText}
                        onChangeText={setReplyText}
                        placeholder="Write reply response..."
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-dark min-h-[50px] text-left"
                        multiline
                      />
                      <View className="flex-row justify-end gap-2">
                        <TouchableOpacity
                          onPress={() => handleToggleReply(rev.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        >
                          <Text className="text-brand-dark text-[10px] font-bold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleSubmitReply(rev.id)}
                          className="px-3 py-1.5 rounded-lg bg-brand-orange"
                        >
                          <Text className="text-white text-[10px] font-bold">Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 7. SECURITY SCREEN -------------------- */}
      {activeScreen === "security" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Security Settings</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-4">Update Password</Text>
            <View className="gap-4 mb-12">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Old Password</Text>
                <TextInput
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry
                  placeholder="Enter old password"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">New Password</Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholder="Enter new password"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Confirm New Password</Text>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  placeholder="Confirm new password"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs"
                />
              </View>

              <TouchableOpacity
                onPress={handleSavePassword}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
              >
                <Text className="text-white text-base font-bold">Update Password</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 8. HELP & SUPPORT SCREEN -------------------- */}
      {activeScreen === "help" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Help & Support</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-4">Frequently Asked Questions</Text>
            <View className="gap-3 mb-12">
              <View className="bg-white p-4 rounded-2xl border border-slate-100">
                <Text className="text-brand-dark text-xs font-bold mb-1">How are payouts processed?</Text>
                <Text className="text-brand-gray text-[10px] leading-4">
                  Payouts can be requested at any time in the Fleet Wallet. Card and bank withdrawals are processed within 24-48 business hours.
                </Text>
              </View>

              <View className="bg-white p-4 rounded-2xl border border-slate-100">
                <Text className="text-brand-dark text-xs font-bold mb-1">What documents are required to add cars?</Text>
                <Text className="text-brand-gray text-[10px] leading-4">
                  You need a valid vehicle registration certificate, tax token, fitness certificate, and route/commercial permit for your region.
                </Text>
              </View>

              <View className="bg-white p-4 rounded-2xl border border-slate-100">
                <Text className="text-brand-dark text-xs font-bold mb-1">Contact Support Directly</Text>
                <Text className="text-brand-gray text-[10px] leading-4 mb-3">
                  Our agency support hotline is available 24/7.
                </Text>
                <TouchableOpacity
                  onPress={() => Alert.alert("Support Call", "Connecting call to +88096123456...")}
                  className="bg-brand-orange py-2.5 rounded-xl items-center justify-center flex-row gap-2"
                >
                  <Ionicons name="call" size={14} color="white" />
                  <Text className="text-white text-xs font-bold">Call Support</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- 9. TERMS & CONDITIONS SCREEN -------------------- */}
      {activeScreen === "terms" && (
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveScreen("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Terms & Conditions</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-4">Fleet Partner Terms</Text>
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm gap-4 mb-12">
              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1">1. Vehicle Ownership & Insurance</Text>
                <Text className="text-brand-gray text-[10px] leading-4">
                  All partners must maintain fully comprehensive rental-specific insurance for all listed vehicles. GoSwift Rides is not responsible for damage caused during passenger rental periods.
                </Text>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1">2. Service Fee Commissions</Text>
                <Text className="text-brand-gray text-[10px] leading-4">
                  GoSwift Rides charges a 10% platform commission on the base daily rental fee of all successful bookings processed via the platform.
                </Text>
              </View>

              <View>
                <Text className="text-brand-dark text-xs font-bold mb-1">3. Maintenance Standards</Text>
                <Text className="text-brand-gray text-[10px] leading-4">
                  Fleet partners are legally bound to inspect and maintain vehicles in pristine mechanical and clean cosmetic condition. Failure to do so will result in suspension from the fleet registry.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
