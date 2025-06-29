import { Dimensions, PixelRatio, Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");
const base = screenWidth < screenHeight ? screenWidth : screenHeight;

const magicNumber = 375;

export const rem = (size = 1) => {
  const scale = base / magicNumber;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
