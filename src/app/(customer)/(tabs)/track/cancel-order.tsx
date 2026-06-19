import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CancelOrderScreen() {
  const router = useRouter();
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    // Navigate back to track index with cancelled parameter set to true
    router.replace({
      pathname: "/(customer)/(tabs)/track",
      params: { cancelled: "true" },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <View className="flex-1 bg-black/45 justify-center items-center px-6">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-[32px] w-full max-w-[340px] p-6 shadow-2xl items-center">
              
              {/* Warning Alert Icon */}
              <View className="w-16 h-16 rounded-full bg-[#F97316] items-center justify-center mb-5 shadow-lg shadow-[#F97316]/20">
                <Ionicons name="warning-outline" size={32} color="#FFFFFF" />
              </View>

              {/* Title Header */}
              <Text className="text-[#1F2937] font-bold text-center text-[15px] px-2 leading-5 mb-5">
                Are sure you want to cancel this order?
              </Text>

              {/* Multi-line TextInput Reason */}
              <View className="w-full bg-[#FAF9F9] border border-gray-200 rounded-2xl px-4 py-3 mb-6">
                <TextInput
                  value={reason}
                  onChangeText={setReason}
                  placeholder="Write reason here..."
                  placeholderTextColor="#9CA3AF"
                  className="text-gray-700 text-xs leading-4 min-h-[70px] text-left"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Action Buttons Row */}
              <View className="flex-row gap-3 w-full" style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="flex-1 py-3.5 rounded-2xl border border-gray-200 bg-white items-center justify-center"
                >
                  <Text className="text-gray-400 font-bold text-xs">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="flex-1 py-3.5 rounded-2xl bg-[#F97316] items-center justify-center shadow-md shadow-[#F97316]/10"
                >
                  <Text className="text-white font-bold text-xs">Submit</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
