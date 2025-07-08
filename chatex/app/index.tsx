import {
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultStyles } from "@/styles/DefaultStyles";
import { useUserStore } from "@/store/useUserStore";
import { rem } from "@/utils/rn-units";
import { getAllRooms } from "@/api/client/rooms/getAllRooms";
import { Button, ButtonText } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Room } from "@/types/room";
import { RoomCard } from "@/components/rooms/Room";

const HomeScreen = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  
  const clearUser = useUserStore().clearUser
  const user = useUserStore().user
  
  

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await getAllRooms();
      setRooms(rooms);
    };
    getRooms();
  }, []);

  // useEffect(()=>{
  //   console.log(rooms);
  // },[rooms])


  const handleDeleteUser = async () => {
    await AsyncStorage.clear()
    clearUser()
    router.replace('/login')
  }
  return (
    <SafeAreaView 
        className="flex-1" 
        edges={["left", "right", "bottom"]}
    >
      <Text>Chats</Text>
      {/* <Button onPress={handleDeleteUser}>
        <ButtonText>Delete user</ButtonText>
      </Button> */}
        {rooms.map(room => (
          <RoomCard room={room} key={room._id} />
        ))}
    </SafeAreaView>
  );
};

export default HomeScreen;

