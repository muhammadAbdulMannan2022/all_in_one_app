import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface FoodItem {
  id: string;
  title: string;
  price: number;
  rating: number;
  time: string;
  discount?: string;
  image: string;
}

interface FoodItemCardProps {
  item: FoodItem;
  onPress: (item: FoodItem) => void;
  onAddToCart: (item: FoodItem) => void;
}

export function FoodItemCard({ item, onPress, onAddToCart }: FoodItemCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 overflow-hidden p-2"
      activeOpacity={0.9}
    >
      {/* Food Image with overlay badge */}
      <View className="w-full h-28 bg-[#F3F4F6] rounded-xl overflow-hidden relative mb-2">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {item.discount ? (
          <View className="absolute top-1.5 left-1.5 bg-[#F97316] px-1.5 py-0.5 rounded-md">
            <Text className="text-white text-[8px] font-black">
              {item.discount}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Info row */}
      <View className="px-1 gap-1">
        <View
          className="flex-row items-center justify-between"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            className="flex-row items-center gap-0.5"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="star" size={10} color="#FFB800" />
            <Text className="text-[#1F2937] text-[10px] font-extrabold">
              {item.rating}
            </Text>
          </View>
          <View
            className="flex-row items-center gap-0.5"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="time-outline" size={10} color="#9CA3AF" />
            <Text className="text-gray-400 text-[8px] font-semibold">
              {item.time}
            </Text>
          </View>
        </View>
        <Text
          className="text-[#1F2937] font-bold text-xs"
          numberOfLines={1}
        >
          {item.title}
        </Text>

        {/* Price & Cart button */}
        <View
          className="flex-row justify-between items-center mt-1"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text className="text-[#F97316] font-bold text-xs">
            ${item.price.toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="w-6 h-6 rounded-full justify-center items-center border border-gray-100 shadow-sm bg-white"
          >
            <Ionicons
              name="basket-outline"
              size={12}
              color="#6A7282"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
