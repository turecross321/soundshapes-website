import { ToastError } from "@/pages/_app";
import axios, { AxiosError } from "axios";
import { SHA512 } from "crypto-js";
import {
  GetPasswordSessionRequest,
  SetEmailRequest,
  SetPasswordRequest,
} from "./types/registration-requests";

export async function SetEmail(authCode: string, email: string) {
  let request: SetEmailRequest = {
    Email: email,
  };

  let config = {
    headers: {
      Authorization: authCode,
    },
  };

  try {
    let response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "setEmail",
      request,
      config
    );

    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastError(error.response?.data.Reason ?? "Invalid Authentication Code.");
    }
  }
}

export async function SetPassword(authCode: string, password: string) {
  let hash = SHA512(password).toString();

  let request: SetPasswordRequest = {
    PasswordSha512: hash,
  };

  let config = {
    headers: {
      Authorization: authCode,
    },
  };

  try {
    let response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "setPassword",
      request,
      config
    );

    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastError(error.response?.data.Reason ?? "Invalid Authentication Code.");
    }
  }
}

export async function SendPasswordSessionRequest(email: string) {
  let request: GetPasswordSessionRequest = {
    Email: email,
  };

  try {
    let response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "sendPasswordSession",
      request
    );

    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastError("An error has occurred.");
    }
  }
}
