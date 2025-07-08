import {  Stack, usePathname, useRouter } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "react-native-reanimated";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { Menu } from "lucide-react-native";
import { MenuIconPressable } from "@/components/icons/MenuIcon";

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
        <Stack.Screen name="index" options={{headerLeft: () => <MenuIconPressable/>, headerTitleAlign:"center"}}  />
        <Stack.Screen name="chat"  />
      </Stack>
    </GluestackUIProvider>
  );
}
