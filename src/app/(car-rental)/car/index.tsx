import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface CarItem {
  id: string;
  name: string;
  status: "Booked" | "Available";
  price: number;
  fuel: string;
  transmission: "A" | "M";
  seats: number;
  image: any;
}

export default function YourCars() {
  const router = useRouter();

  // Views: "main" | "add-step-1" | "add-step-2" | "add-step-3" | "add-step-4" | "add-step-5"
  const [activeView, setActiveView] = useState<
    "main" | "add-step-1" | "add-step-2" | "add-step-3" | "add-step-4" | "add-step-5"
  >("main");

  // Tabs under main: "all" | "booked" | "available"
  const [activeTab, setActiveTab] = useState<"all" | "booked" | "available">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form states for Add Car wizard
  const [formName, setFormName] = useState("Toyota Camry 2022");
  const [formModel, setFormModel] = useState("Sports Utility Vehicle (SUV)");
  const [formType, setFormType] = useState("Luxury Sedan");
  const [formDesc, setFormDesc] = useState(
    "The Toyota Camry 2022 is a groundbreaking plug-in hybrid supercar that marks Lamborghini's transition into electrification. Read More..."
  );

  const [formSpeed, setFormSpeed] = useState("250km/h");
  const [formTransmission, setFormTransmission] = useState("Automatic");
  const [formEngine, setFormEngine] = useState("2300 HP");
  const [formCapacity, setFormCapacity] = useState("7 Person");
  const [formFuelType, setFormFuelType] = useState("Petrol");

  const [formRentFee, setFormRentFee] = useState("1200");
  const [formServiceFee, setFormServiceFee] = useState("20.95");
  const [formInsuranceFee, setFormInsuranceFee] = useState("0.48");

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(["main_photo.png"]);

  // Mock Cars list matching screenshot
  const [cars, setCars] = useState<CarItem[]>([
    {
      id: "1",
      name: "Toyota Camry 2022",
      status: "Booked",
      price: 1200,
      fuel: "12.5",
      transmission: "A",
      seats: 7,
      image: require("@/assets/images/onboarding/3.png"),
    },
    {
      id: "2",
      name: "Toyota Camry 2022",
      status: "Available",
      price: 1200,
      fuel: "12.5",
      transmission: "A",
      seats: 7,
      image: require("@/assets/images/onboarding/3.png"),
    },
    {
      id: "3",
      name: "Toyota Camry 2022",
      status: "Booked",
      price: 1200,
      fuel: "12.5",
      transmission: "A",
      seats: 7,
      image: require("@/assets/images/onboarding/3.png"),
    },
  ]);

  const handleSimulatePhotoUpload = () => {
    setUploadedPhotos([...uploadedPhotos, `car_pic_${uploadedPhotos.length + 1}.png`]);
  };

  const handleSaveCar = () => {
    const newCar: CarItem = {
      id: (cars.length + 1).toString(),
      name: formName,
      status: "Available",
      price: parseFloat(formRentFee) || 1200,
      fuel: "12.5",
      transmission: formTransmission.startsWith("A") || formTransmission.startsWith("a") ? "A" : "M",
      seats: parseInt(formCapacity) || 7,
      image: require("@/assets/images/onboarding/3.png"),
    };

    setCars([newCar, ...cars]);
    setActiveView("add-step-5");
  };

  const handleFinishWizard = () => {
    setActiveView("main");
    // Clear forms
    setFormName("Toyota Camry 2022");
    setFormModel("Sports Utility Vehicle (SUV)");
    setFormType("Luxury Sedan");
    setFormRentFee("1200");
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeTab === "booked") return car.status === "Booked";
    if (activeTab === "available") return car.status === "Available";
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* -------------------- 1. MY CARS LIST SCREEN -------------------- */}
      {activeView === "main" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(car-rental)/dashboard" as any)}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Your Car</Text>
            <View className="w-6" />
          </View>

          {/* Search bar */}
          <View className="px-6 pt-4 pb-2">
            <View className="w-full bg-white border border-slate-100 rounded-2xl flex-row items-center px-4 shadow-sm">
              <Ionicons name="search-outline" size={18} color="#A0AEC0" className="mr-2" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search nearby services"
                placeholderTextColor="#A0AEC0"
                className="flex-1 py-3 text-xs text-brand-dark"
              />
            </View>
          </View>

          {/* Sub-tabs: All Car, Booked, Available */}
          <View className="flex-row px-6 py-3 justify-between items-center bg-white border-b border-slate-100">
            <View className="flex-row gap-5">
              {["all", "booked", "available"].map((tab) => {
                const isSelected = activeTab === tab;
                const labels = { all: "All Car", booked: "Booked", available: "Available" };
                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab as any)}
                    className="pb-2 relative"
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isSelected ? "text-brand-orange" : "text-brand-gray"
                      }`}
                    >
                      {labels[tab as keyof typeof labels]}
                    </Text>
                    {isSelected && (
                      <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Float Add button */}
            <TouchableOpacity
              onPress={() => setActiveView("add-step-1")}
              className="flex-row items-center gap-1 bg-brand-orange/15 px-3 py-1.5 rounded-full"
            >
              <Ionicons name="add-circle" size={14} color="#E4792F" />
              <Text className="text-brand-orange text-[10px] font-bold">Add Car</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Active Listing Count */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-brand-gray text-[10px] font-bold">
                {activeTab === "all" && "Total Listed Car : 50"}
                {activeTab === "booked" && "booked Car : 40"}
                {activeTab === "available" && "Available Car : 10"}
              </Text>
            </View>

            {/* Cars cards grid */}
            <View className="gap-4 pb-12">
              {filteredCars.map((car) => (
                <View
                  key={car.id}
                  className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
                >
                  {/* Car Picture Box */}
                  <View className="w-full h-32 bg-slate-50 border border-slate-100 overflow-hidden items-center justify-center p-4 rounded-2xl mb-4">
                    <Ionicons name="car-sport" size={64} color="#A0AEC0" />
                  </View>

                  {/* Title & Price */}
                  <View className="flex-row justify-between items-center">
                    <View>
                      <View className="flex-row items-center gap-2">
                        <Text className="text-brand-dark text-xs font-bold">{car.name}</Text>
                        <View
                          className={`px-2 py-0.5 rounded ${
                            car.status === "Booked" ? "bg-emerald-50" : "bg-orange-50"
                          }`}
                        >
                          <Text
                            className={`text-[8px] font-bold ${
                              car.status === "Booked" ? "text-emerald-500" : "text-brand-orange"
                            }`}
                          >
                            {car.status}
                          </Text>
                        </View>
                      </View>

                      {/* Specs badges inline */}
                      <View className="flex-row items-center gap-3 mt-3">
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="water-outline" size={10} color="#6A7282" />
                          <Text className="text-brand-gray text-[9px] font-semibold">{car.fuel}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="options-outline" size={10} color="#6A7282" />
                          <Text className="text-brand-gray text-[9px] font-semibold">{car.transmission}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="people-outline" size={10} color="#6A7282" />
                          <Text className="text-brand-gray text-[9px] font-semibold">{car.seats}</Text>
                        </View>
                      </View>
                    </View>

                    <Text className="text-brand-dark text-xs font-extrabold">
                      ${car.price}
                      <Text className="text-slate-400 text-[9px] font-semibold">/day</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- ADD STEP 1: PHOTO UPLOAD -------------------- */}
      {activeView === "add-step-1" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("main")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Add Your Car</Text>
            <View className="w-6" />
          </View>

          {/* Indicators Progress Stepper */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1 bg-brand-orange rounded-full w-[22%]" />
            <View className="h-1 bg-slate-200 rounded-full w-[22%]" />
            <View className="h-1 bg-slate-200 rounded-full w-[22%]" />
            <View className="h-1 bg-slate-200 rounded-full w-[22%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-dark text-sm font-bold mb-4">Upload Your Car Photo</Text>
            
            {/* Grid of photo upload boxes */}
            <View className="flex-row flex-wrap justify-between gap-y-4 mb-12">
              <TouchableOpacity
                onPress={handleSimulatePhotoUpload}
                className="w-[48%] h-32 border-2 border-dashed border-slate-300 rounded-2xl bg-white items-center justify-center"
              >
                <Ionicons name="cloud-upload-outline" size={24} color="#A0AEC0" />
                <Text className="text-brand-dark text-[10px] font-bold mt-1">Upload Item Photo</Text>
                <Text className="text-brand-gray text-[8px]">JPG, PNG up to 5MB</Text>
              </TouchableOpacity>

              {/* Mock placeholder cards */}
              {Array.from({ length: 3 }).map((_, i) => (
                <View
                  key={i}
                  className="w-[48%] h-32 border border-slate-100 rounded-2xl bg-slate-50 items-center justify-center p-2"
                >
                  <Ionicons name="add" size={24} color="#A0AEC0" />
                  <Text className="text-slate-400 text-[9px] font-bold mt-1">Add More</Text>
                </View>
              ))}
            </View>

            {/* Continue button */}
            <TouchableOpacity
              onPress={() => setActiveView("add-step-2")}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
            >
              <Text className="text-white text-base font-bold">Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* -------------------- ADD STEP 2: CAR INFO & SPECS -------------------- */}
      {activeView === "add-step-2" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("add-step-1")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Add Your Car</Text>
            <View className="w-6" />
          </View>

          {/* Stepper Indicators */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1 bg-brand-orange rounded-full w-[22%]" />
            <View className="h-1 bg-brand-orange rounded-full w-[22%]" />
            <View className="h-1 bg-slate-200 rounded-full w-[22%]" />
            <View className="h-1 bg-slate-200 rounded-full w-[22%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-orange text-xs font-bold mb-4">Your Car Information</Text>

            <View className="gap-4 mb-6">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Car Name</Text>
                <TextInput
                  value={formName}
                  onChangeText={setFormName}
                  placeholder="Enter car name"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Car Model</Text>
                <TextInput
                  value={formModel}
                  onChangeText={setFormModel}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Car Type</Text>
                <TextInput
                  value={formType}
                  onChangeText={setFormType}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Description</Text>
                <TextInput
                  value={formDesc}
                  onChangeText={setFormDesc}
                  multiline
                  numberOfLines={4}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold min-h-[90px] text-left"
                />
              </View>
            </View>

            <Text className="text-brand-orange text-xs font-bold mb-4 mt-2">Your Car Specifications</Text>

            <View className="gap-4 mb-12">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Top Speed</Text>
                <TextInput
                  value={formSpeed}
                  onChangeText={setFormSpeed}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Transmission</Text>
                <TextInput
                  value={formTransmission}
                  onChangeText={setFormTransmission}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Engine</Text>
                <TextInput
                  value={formEngine}
                  onChangeText={setFormEngine}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Fuel Type</Text>
                <TextInput
                  value={formFuelType}
                  onChangeText={setFormFuelType}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              {/* Continue button */}
              <TouchableOpacity
                onPress={() => setActiveView("add-step-3")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
              >
                <Text className="text-white text-base font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- ADD STEP 3: PRICING -------------------- */}
      {activeView === "add-step-3" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("add-step-2")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Add Your Car</Text>
            <View className="w-6" />
          </View>

          {/* Stepper Indicators */}
          <View className="flex-row px-12 py-3 bg-slate-50 items-center justify-between">
            <View className="h-1 bg-brand-orange rounded-full w-[22%]" />
            <View className="h-1 bg-brand-orange rounded-full w-[22%]" />
            <View className="h-1 bg-brand-orange rounded-full w-[22%]" />
            <View className="h-1 bg-slate-200 rounded-full w-[22%]" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <Text className="text-brand-orange text-xs font-bold mb-6">Pricing</Text>

            <View className="gap-5 mb-12">
              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Rent fee (Per day)</Text>
                <TextInput
                  value={formRentFee}
                  onChangeText={setFormRentFee}
                  keyboardType="numeric"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Service Fee (Optional)</Text>
                <TextInput
                  value={formServiceFee}
                  onChangeText={setFormServiceFee}
                  keyboardType="numeric"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              <View className="gap-1.5">
                <Text className="text-[10px] font-bold text-brand-dark">Insurance Fee (Optional)</Text>
                <TextInput
                  value={formInsuranceFee}
                  onChangeText={setFormInsuranceFee}
                  keyboardType="numeric"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-xs font-semibold"
                />
              </View>

              {/* Done button */}
              <TouchableOpacity
                onPress={() => setActiveView("add-step-4")}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-8"
              >
                <Text className="text-white text-base font-bold">Done</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- ADD STEP 4: PREVIEW -------------------- */}
      {activeView === "add-step-4" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("add-step-3")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Listing Preview</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Visual car */}
            <View className="w-full h-44 bg-slate-50 border border-slate-100 overflow-hidden items-center justify-center p-4 rounded-3xl mb-4 relative">
              <Ionicons name="car-sport" size={72} color="#E4792F" />
              <TouchableOpacity className="absolute bottom-2 bg-white/50 px-3 py-1 rounded-full border border-slate-200/40">
                <Text className="text-brand-dark text-[9px] font-bold">Change Image</Text>
              </TouchableOpacity>
            </View>

            {/* Information Preview Layout */}
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-brand-dark text-base font-bold">{formName}</Text>
                <Text className="text-brand-gray text-[10px] font-semibold mt-1">{formModel}</Text>
              </View>
              <Text className="text-[#E4792F] text-base font-extrabold">
                ${formRentFee}
                <Text className="text-slate-400 text-xs font-semibold">/day</Text>
              </Text>
            </View>

            {/* Grid Specifications Cards */}
            <View className="flex-row flex-wrap justify-between gap-y-4 mb-6">
              {[
                { icon: "speedometer-outline", label: formSpeed, desc: "Top Speed" },
                { icon: "options-outline", label: formTransmission, desc: "Transmission" },
                { icon: "hardware-chip-outline", label: formEngine, desc: "Engine" },
                { icon: "people-outline", label: formCapacity, desc: "Capacity" },
                { icon: "water-outline", label: formFuelType, desc: "Fuel Type" },
              ].map((item, index) => (
                <View
                  key={index}
                  className="w-[30%] bg-white border border-slate-100 p-3 rounded-2xl items-center justify-center shadow-sm"
                >
                  <View className="bg-orange-50 p-2 rounded-xl mb-2">
                    <Ionicons name={item.icon as any} size={14} color="#E4792F" />
                  </View>
                  <Text className="text-brand-dark text-[9px] font-bold text-center">{item.label}</Text>
                  <Text className="text-slate-400 text-[8px] font-semibold mt-0.5 text-center">{item.desc}</Text>
                </View>
              ))}
            </View>

            {/* Details paragraph */}
            <View className="mb-12">
              <Text className="text-brand-dark text-xs font-bold mb-2">Details</Text>
              <Text className="text-brand-gray text-[11px] leading-5 font-semibold">
                {formDesc}
              </Text>
            </View>

            {/* Publish button */}
            <TouchableOpacity
              onPress={handleSaveCar}
              className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4"
            >
              <Text className="text-white text-base font-bold">Publish</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* -------------------- ADD STEP 5: SUCCESS MODAL OVERLAY -------------------- */}
      {activeView === "add-step-5" && (
        <View className="flex-1 bg-white items-center justify-center p-6">
          <View className="w-full max-w-sm items-center">
            {/* success check badge */}
            <View className="w-20 h-20 rounded-full bg-emerald-500 items-center justify-center mb-8 shadow shadow-emerald-500/25">
              <Ionicons name="checkmark" size={42} color="white" />
            </View>
            <Text className="text-brand-dark text-lg font-black text-center mb-10 px-6 leading-6">
              Your Car is added on your car list successfully
            </Text>

            <TouchableOpacity
              onPress={handleFinishWizard}
              className="w-full py-4 bg-[#E4792F] rounded-2xl items-center justify-center"
            >
              <Text className="text-white text-base font-bold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
