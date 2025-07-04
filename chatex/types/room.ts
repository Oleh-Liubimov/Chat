export interface Room {
  name: string;
  description: string;
  type: "public" | "private";
  members: string[];
  createdBy: string;
}
