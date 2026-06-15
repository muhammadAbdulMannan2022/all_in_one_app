import { Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "secondary" | "outline";
}

export function Button({
  title,
  onPress,
  isLoading = false,
  iconName,
  variant = "primary",
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  let bgStyle = "bg-brand-orange border border-transparent";
  let textStyle = "text-white";
  let iconColor = "white";

  if (variant === "secondary") {
    bgStyle = "bg-brand-gray/10 border border-transparent";
    textStyle = "text-brand-dark";
    iconColor = "#2E2E2D";
  } else if (variant === "outline") {
    bgStyle = "bg-transparent border border-brand-orange";
    textStyle = "text-brand-orange";
    iconColor = "#E4792F";
  }

  if (isButtonDisabled) {
    bgStyle = "bg-brand-gray/40 border border-transparent opacity-60";
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isButtonDisabled}
      activeOpacity={0.8}
      className={`w-full py-4 px-6 rounded-2xl flex-row items-center justify-center gap-2 ${bgStyle} ${className}`}
      style={{ shadowColor: "#E4792F", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <>
          <Text className={`text-base font-bold text-center ${textStyle}`}>
            {title}
          </Text>
          {iconName && (
            <Ionicons name={iconName} size={18} color={iconColor} className="ml-2" />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
