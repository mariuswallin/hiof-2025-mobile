import { cn } from "@/utils/cn";
import { Text, TouchableOpacity, View } from "react-native";

export type CardProps = {
  children: React.ReactNode;
  title?: string;
  onPress?: () => void;
  styles?: {
    container?: string;
    title?: string;
    titleWrapper?: string;
    content?: string;
    button?: string;
  };
};

const BaseCard = ({ children, title, styles }: CardProps) => {
  return (
    <View
      className={cn(
        "flex-1 items-center justify-center bg-[#f5f5f5] p-5 h-auto",
        styles?.container
      )}
    >
      <View
        className={cn(
          "w-[90%] bg-white rounded-lg overflow-hidden shadow-lg",
          styles?.content
        )}
      >
        <View className={cn("bg-primary", styles?.titleWrapper)}>
          <Text className={cn("text-white font-bold text-base", styles?.title)}>
            {title}
          </Text>
        </View>
        {children}
      </View>
    </View>
  );
};

export default function Card({ children, title, styles, onPress }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={cn("w-full flex-1", styles?.button)}
      >
        <BaseCard title={title} styles={styles}>
          {children}
        </BaseCard>
      </TouchableOpacity>
    );
  }
  return (
    <BaseCard title={title} styles={styles}>
      {children}
    </BaseCard>
  );
}
