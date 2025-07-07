import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return <GluestackUIProvider mode="light"><RootLayoutNav /></GluestackUIProvider>;
}

function RootLayoutNav() {
  return (
    <GluestackUIProvider mode="light"><Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
      </Stack></GluestackUIProvider>
  );
}
