import axios from "axios";
import { UserResponse } from "./types/user-response";
import UserProvider, { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

export async function GetUser(userId: string) {
  try {
    let response = await axios.get<UserResponse>(
      process.env.NEXT_PUBLIC_API_URL + `user/${userId}`
    );

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function CheckIfFollowed(userId: string, sessionId: string) {
  if (sessionId === "") return null;

  const config = {
    headers: {
      Authorization: sessionId,
    },
  };

  try {
    let response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `user/${userId}/followed`,
      config
    );

    return response.data.IsFollowed;
  } catch (error) {
    return null;
  }
}
