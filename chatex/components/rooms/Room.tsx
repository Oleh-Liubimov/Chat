import { Room } from "@/types/room";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Image } from "../ui/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Heading } from "../ui/heading";

interface RoomProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomProps) => {
  return (
    <View className="flex-row gap-5">
      <Avatar>
        <AvatarImage source={{ uri: room.roomAvatarUrl }} />
      </Avatar>
      <View>
        <Heading>{room.name}</Heading>
        <Text>{room.description}</Text>
      </View>
    </View>
  );
};
