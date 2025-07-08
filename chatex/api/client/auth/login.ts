import { User } from "@/types/user";
import { post } from "..";

export interface LoginPayload {
  username: string;
}
export interface LoginResponse {
  user: User;
  accessToken: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return post<LoginPayload, LoginResponse>(
    "auth/login",
    payload
  );
}
