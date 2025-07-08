import {  Stack, usePathname, useRouter } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "react-native-reanimated";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { Menu } from "lucide-react-native";
import { MenuIconPressable } from "@/components/icons/MenuIcon";
import { AddChatIcon } from "@/components/icons/AddChatIcon";
import { Platform } from "react-native";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <RootLayoutNav />
    </GluestackUIProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const pathname = usePathname();
  const loading = useUserStore().loading

  const user = useUserStore().user

 
  useEffect(() => {
    if(loading){
      return
    }
    if (user && pathname !== "/") {
      router.replace("/");
    }
    else if (!user) {
      router.replace("/login");
    }
  }, [user, pathname, loading]);
  return (
    <GluestackUIProvider mode="dark">
      <Stack initialRouteName="index">
        <Stack.Screen name="index" 
        options={{
          headerLeft: () => <MenuIconPressable/>, 
          headerRight:()=> <AddChatIcon />,
          headerTitleAlign:"center" , 
          headerTitle:"My Chats"}}
          />
        <Stack.Screen name="chat"  />
        <Stack.Screen name='(modal)/createChat' 
          options={{
            headerShown:false,
          headerTitle:"Create chat", 
          presentation:"formSheet",
          sheetCornerRadius:20,
          sheetAllowedDetents:Platform.OS === "android" ? [0.75] : [0.85],
          sheetElevation:24,
          animation:'slide_from_bottom'
        }} 
        />
      </Stack>
    </GluestackUIProvider>
  );
}
