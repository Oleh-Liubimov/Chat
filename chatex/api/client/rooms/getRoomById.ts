import {Room} from '@/types/room';
import {get} from '..';

export const getRoomById = async (roomId: string): Promise<Room | null> => {
  return get<Room | null>(`rooms/${roomId}`);
};
