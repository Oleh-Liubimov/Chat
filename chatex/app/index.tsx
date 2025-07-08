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

const HomeScreen = () => {
  
  const clearUser = useUserStore().clearUser
  const user = useUserStore().user
  console.log(user);
  

  useEffect(() => {
    const getRooms = async () => {

      const rooms = await getAllRooms();
      
    };
    getRooms();
  }, []);

  const handleDeleteUser = async () => {
    await AsyncStorage.clear()
    clearUser()
    router.replace('/login')
  }
  return (
    <SafeAreaView style={DefaultStyles.flex1}>
      <Text>Chats</Text>
      <Button onPress={handleDeleteUser}>
        <ButtonText>Delete user</ButtonText>
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: rem(20),
  },
  input: {
    borderColor: "black",
    borderRadius: rem(12),
    width: "80%",
    borderWidth: rem(1),
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: rem(16),
    paddingVertical: rem(12),
  },
  button: {
    paddingHorizontal: rem(16),
    paddingVertical: rem(12),
    borderRadius: rem(12),
    borderWidth: rem(1),
    textAlign: "center",
    borderColor: "#4287f5",
    backgroundColor: "#4287f5",
  },
});
