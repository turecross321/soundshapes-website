import { ToastError } from "@/pages/_app";
import { AxiosError } from "axios";
import { SHA512 } from "crypto-js";
import { api } from "./api-client";
import {
  SetEmailRequest,
  SetPasswordRequest,
  GetPasswordSessionRequest,
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
    let response = await api.post("setEmail", request, config);

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
    let response = await api.post("setPassword", request, config);

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
    let response = await api.post("sendPasswordSession", request);

    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastError("An error has occurred.");
    }
  }
}
