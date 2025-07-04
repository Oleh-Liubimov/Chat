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
  console.log("here");

  return post<LoginPayload, LoginResponse>(
    "http://localhost:8080/auth/login",
    payload
  );
}
