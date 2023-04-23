import { LogIn } from "@/api/api-authentication";
import { AuthenticationResponse } from "@/api/types/authentication-responses";
import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";

interface AutoLoginProps {}

const AutoLogin: FC<AutoLoginProps> = ({}) => {
  const { setSession } = useContext(SessionContext);
  const router = useRouter();

  let sessionString;
  let session: AuthenticationResponse;

  useEffect(() => {
    async function Login() {
      if (!setSession) return;

      sessionString = localStorage.getItem("session");
      let email = localStorage.getItem("email");
      let password = localStorage.getItem("hash");
      if (sessionString) {
        session = JSON.parse(sessionString.toString());

        if (session.Id) {
          new Date(session.ExpiresAt).getUTCDate();

          // Login again if session has expired
          if (new Date(session.ExpiresAt).getTime() <= new Date().getTime()) {
            let email = localStorage.getItem("email");
            let password = localStorage.getItem("hash");

            if (!email || !password) {
              router.push("login");
              return;
            }

            let result = await LogIn(email, password, setSession, false);
            if (!result) {
              localStorage.removeItem("session");
              localStorage.removeItem("email");
              localStorage.removeItem("hash");
              router.push("login");
              return;
            }

            session = result;
          }

          setSession(session);
        }
      } else if (email && password) {
        if (!email || !password) {
          router.push("login");
          return;
        }

        let result = await LogIn(email, password, setSession, false);
        if (!result) {
          localStorage.removeItem("session");
          localStorage.removeItem("email");
          localStorage.removeItem("hash");
          router.push("login");
          return;
        }

        session = result;
      }
    }
    Login();
  }, [setSession]);

  return null;
};

export default AutoLogin;
