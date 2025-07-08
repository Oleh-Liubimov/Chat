import { TouchableOpacity } from "react-native";
import React from "react";
import { Menu } from "lucide-react-native";

export const MenuIconPressable = () => {
  return (
    <TouchableOpacity>
      <Menu />
    </TouchableOpacity>
  );
};
