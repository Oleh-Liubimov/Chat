import {Room} from '@/types/room';
import {Text} from '../ui/text';
import {Avatar, AvatarImage} from '../ui/avatar';
import {Heading} from '../ui/heading';
import {VStack} from '../ui/vstack';
import {Divider} from '../ui/divider';
import {Pressable, TouchableOpacity} from 'react-native';
import {getRoomById} from '@/api/client/rooms/getRoomById';
import {router} from 'expo-router';

interface RoomProps {
  room: Room;
}

export const RoomCard = ({room}: RoomProps) => {
  const handleCardPress = async () => {
    router.push({
      pathname: `/chat/[roomId]`,
      params: {
        roomId: room._id,
        roomName: room.name,
      },
    });
  };
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <VStack className="flex-row gap-5 bg-gray-200 p-2">
        <Avatar size="lg">
          <AvatarImage source={{uri: room.roomAvatarUrl}} />
        </Avatar>
        <VStack className="w-full">
          <Heading>{room.name}</Heading>
          <Text>{room.description}</Text>
        </VStack>
      </VStack>
    </TouchableOpacity>
  );
};
