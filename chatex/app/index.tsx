import {
  StyleSheet,
  Text,
  View,
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
import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";

const HomeScreen = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomsLoading, setRoomsLoading] = useState<boolean>(true)
  
  const clearUser = useUserStore().clearUser
  const user = useUserStore().user
  
  

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await getAllRooms();
      setRooms(rooms);
      setRoomsLoading(false)
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

  if(roomsLoading){
   return (
   <Center className="flex-1">
    < Spinner size='large'/>
   </Center>
   )
  } 
  return (
    <SafeAreaView 
        className="flex-1" 
        edges={["left", "right", "bottom"]}
    >
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

