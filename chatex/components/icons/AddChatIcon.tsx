import { TouchableOpacity } from "react-native";
import React from "react";
import { Plus } from "lucide-react-native";
import { Link } from "expo-router";

export const AddChatIcon = () => {
  return (
    <Link href="/(modal)/createChat" asChild>
      <Plus />
    </Link>
  );
};
