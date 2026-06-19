import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface CategoryItem {
  id: string;
  title: string;
  icon?: any;
  image?: string;
}

interface CustomerCategoriesProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CustomerCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: CustomerCategoriesProps) {
  const hasImages = categories.some((cat) => cat.image);

  if (hasImages) {
    return (
      <View className="py-2.5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => onSelectCategory(cat.id)}
                className="items-center"
                activeOpacity={0.8}
              >
                {/* Rounded Image Container */}
                <View 
                  className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-white"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  {cat.image ? (
                    <Image
                      source={{ uri: cat.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
                <Text
                  className={`text-xs mt-1.5 font-semibold text-center ${
                    isActive ? "text-[#F97316] font-bold" : "text-[#8E8E93]"
                  }`}
                >
                  {cat.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="px-6 py-3 mb-2">
      <View className="flex-row justify-between w-full gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const tintColor = isActive ? "#F97316" : "#AAAAAA";
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => onSelectCategory(cat.id)}
              className="items-center flex-1 p-1 aspect-square gap-1 py-2"
              activeOpacity={0.8}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
              }}
            >
              {cat.icon && (
                <Ionicons name={cat.icon} size={22} color={tintColor} />
              )}
              <Text
                className="text-[11px] font-semibold text-center"
                style={{ color: tintColor }}
              >
                {cat.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

