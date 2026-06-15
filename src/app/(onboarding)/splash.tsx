import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View, Image } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(onboarding)/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-brand-bg">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("@/assets/logo.png")}
          className="w-64 h-32"
          resizeMode="contain"
        />
      </View>
      <View className="pb-12">
        <Text className="text-brand-gray text-sm font-medium tracking-wide">
          All You Need, In One App
        </Text>
      </View>
    </View>
  );
}
