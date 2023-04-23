import { ToastSuccess, ToastError } from "@/pages/_app";
import { SHA512 } from "crypto-js";
import { Dispatch, SetStateAction } from "react";
import { api } from "./api-client";
import { LoginRequest } from "./types/authentication-requests";
import { AuthenticationResponse } from "./types/authentication-responses";

export async function LogIn(
  email: string,
  password: string,
  setSession: Dispatch<SetStateAction<AuthenticationResponse>>,
  hashPassword: boolean = true
) {
  let hash = hashPassword ? SHA512(password).toString() : password;

  let request: LoginRequest = {
    Email: email,
    PasswordSha512: hash,
  };

  try {
    let response = await api.post<AuthenticationResponse>("login", request);

    localStorage.setItem("session", JSON.stringify(response.data));
    localStorage.setItem("email", email);
    localStorage.setItem("hash", hash);

    ToastSuccess("Welcome, " + response.data.Username);

    setSession(response.data);

    return response.data;
  } catch (error: any) {
    ToastError(error.response?.data.Reason ?? "An error has occurred.");
    console.log(error);
  }
}

export async function LogOut() {
  try {
    api.post("logout");
  } catch (error) {}
}
