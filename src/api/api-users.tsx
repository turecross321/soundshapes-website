import { api } from "./api-client";
import { UserResponse } from "./types/user-response";

export async function GetUser(userId: string) {
  try {
    let response = await api.get<UserResponse>(`users/${userId}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function CheckIfFollowed(userId: string) {
  try {
    let response = await api.get<any>(`users/${userId}/followed`);

    return response.data.IsFollowed;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function FollowUser(id: string, follow: boolean) {
  try {
    let response = await api.post(
      `users/${id}/${follow ? "follow" : "unFollow"}`
    );

    return response.status;
  } catch (error) {
    return null;
  }
}
