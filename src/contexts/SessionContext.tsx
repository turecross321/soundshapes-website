import { AuthenticationResponse } from "@/api/types/authentication-responses";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
} from "react";

export interface SessionContextInterface {
  session: AuthenticationResponse | null;
  setSession: Dispatch<SetStateAction<AuthenticationResponse>>;
}

export const SessionContext = createContext<Partial<SessionContextInterface>>(
  {}
);

type SessionProviderProps = {
  children: ReactNode;
};

export default function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<AuthenticationResponse>({
    Id: "",
    ExpiresAt: new Date(),
    UserId: "",
    Username: "",
  });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
