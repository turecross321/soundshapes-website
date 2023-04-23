import { create } from "middleware-axios/dist";
import { AuthenticationResponse } from "./types/authentication-responses";
import { AxiosError } from "axios";
import { LogIn } from "./api-authentication";

export const apiUrl: string = "http://192.168.1.134:10061/api/v1/";

export const api = create({
  baseURL: apiUrl,
});

api.use(async (config, next, defaults) => {
  if (typeof window !== "undefined") {
    try {
      let sessionString = localStorage.getItem("session");
      if (sessionString) {
        let session: AuthenticationResponse = JSON.parse(sessionString);
        if (session.Id) {
          config.headers = { Authorization: session.Id };
        }
      }
    } catch {}
  }

  try {
    await next(config);
  } catch (error: any) {
    if (error.response.status == 403) {
      // If there is a session and the user got 403, nuke it
      if (localStorage.getItem("session")) {
        localStorage.removeItem("session");
        location.assign("/");
      }
    }
  }
});
