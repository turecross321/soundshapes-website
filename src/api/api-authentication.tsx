import { SHA512 } from "crypto-js";
import axios, { AxiosError } from "axios";
import { LoginRequest } from "./types/authentication-requests";
import { ToastError, ToastSuccess } from "@/pages/_app";
import { createContext } from "react";

export async function LogIn(email: string, password: string) {
  let hash = SHA512(password).toString();

  let request: LoginRequest = {
    Email: email,
    PasswordSha512: hash,
  };

  try {
    let response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "login",
      request
    );

    sessionStorage.setItem("sessionId", response.data.Id);
    sessionStorage.setItem("userId", response.data.UserId);
    sessionStorage.setItem("username", response.data.Username);

    localStorage.setItem("email", email);
    localStorage.setItem("hash", hash);

    ToastSuccess("Welcome, " + response.data.Username);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastError(error.response?.data.Reason ?? "An error has occurred.");
    }
  }
}
