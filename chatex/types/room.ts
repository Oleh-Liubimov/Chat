export interface Room {
  _id: string;
  name: string;
  roomAvatarUrl: string;
  description: string;
  type: "public" | "private";
  members: string[];
  createdBy: string;
}
