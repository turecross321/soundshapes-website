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
      sessionString = localStorage.getItem("session");
      if (sessionString) {
        session = JSON.parse(sessionString.toString());

        if (session.Id && setSession) {
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
      }
    }
    Login();
  }, [setSession]);

  return null;
};

export default AutoLogin;
