
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store/useUserStore";
import { getAllRooms } from "@/api/client/rooms/getAllRooms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";
import { Room } from "@/types/room";
import { RoomCard } from "@/components/rooms/RoomCard";
import { FlatList } from "react-native";
import { Divider } from "@/components/ui/divider";

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
        
        <FlatList 
        data={rooms} 
        keyExtractor={(item)=>item._id} 
        renderItem={({item}) => (
          <RoomCard room={item} key={item._id} />
        )}
       ItemSeparatorComponent={()=>(
        <Divider className=" bg-black"/>
       )}
        />
    </SafeAreaView>
  );
};

export default HomeScreen;

