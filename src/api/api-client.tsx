import { create } from "middleware-axios/dist";
import { AuthenticationResponse } from "./types/authentication-responses";

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

  await next(config);
});
