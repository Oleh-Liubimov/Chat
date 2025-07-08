import { getAllRooms } from "@/api/client/rooms/getAllRooms";
import { Button, ButtonText } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function ChatsScreen() {
  useEffect(() => {
    const getRooms = async () => {
      console.log("rer");

      const rooms = await getAllRooms();
      console.log(rooms);
    };
    getRooms();
  }, []);


  return (
    <View>
      <Text>Chats</Text>

    </View>
  );
}
