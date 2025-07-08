import { Room } from "@/types/room";
import { get } from "..";
import { Platform } from "react-native";


export const getAllRooms = async () => {
  return get<Room[]>("rooms");
};
