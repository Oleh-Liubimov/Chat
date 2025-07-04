import { Room } from "@/types/room";
import { View, Text } from "react-native";

interface RoomProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomProps) => {
  return (
    <View>
      <Text>{room.name}</Text>
    </View>
  );
};
