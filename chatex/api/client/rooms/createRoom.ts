import {Room} from '@/types/room';
import {post} from '..';

interface CreateRoomParams {
  name: string;
  description?: string;
  members?: string[] | null;
  imageUrl?: string | null;
  createdBy: string;
  type: 'private' | 'public';
}

interface CreateRoomResponse {
  room: Room;
}

export const createRoom = async (
  data: CreateRoomParams,
): Promise<CreateRoomResponse> => {
  return post<CreateRoomParams, CreateRoomResponse>('rooms/create-room', data);
};
