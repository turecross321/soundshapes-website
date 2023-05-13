import { api } from "./api-client";
import { LevelResponse, LevelResponseWrapper } from "./types/level-responses";

export async function GetLevelsByUser(id: string, from: number, count: number) {
  try {
    let response = await api.get<LevelResponseWrapper>(
      `levels?from=${from}&count=${count}&byUser=${id}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function GetLevel(id: string) {
  try {
    let response = await api.get<LevelResponse>(`levels/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}
