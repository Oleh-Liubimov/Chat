import { Room } from "@/types/room";
import { get } from "..";

interface GetAllRoomsResponse {
  rooms: Room[];
}
export const getAllRooms = async () => {
  const response = await get<GetAllRoomsResponse>("rooms");

  return response.rooms;
};
