import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/button";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-brand-bg px-6 justify-between py-10">
      <View className="flex-1 justify-center items-center gap-4">
        <Text className="text-brand-dark text-3xl font-bold text-center">
          Welcome Back
        </Text>
        <Text className="text-brand-gray text-base text-center max-w-[280px]">
          Sign in to your account to continue using Goswift Rides.
        </Text>
      </View>

      <View className="w-full gap-4">
        <Button
          title="Sign In with Phone"
          iconName="phone-portrait-outline"
          onPress={() => console.log("Login clicked")}
        />
        <Button
          title="Go Back to Onboarding"
          variant="outline"
          onPress={() => router.replace("/(onboarding)/onboarding")}
        />
      </View>
    </SafeAreaView>
  );
}
