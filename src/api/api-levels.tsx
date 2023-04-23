import { api } from "./api-client";
import { LevelResponse, LevelResponseWrapper } from "./types/level-responses";

export async function GetLevelsByUser(id: string, from: number, count: number) {
  try {
    let response = await api.get<LevelResponseWrapper>(
      `user/${id}/levels?from=${from}&count=${count}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function GetLevel(id: string) {
  try {
    let response = await api.get<LevelResponse>(`level/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}
