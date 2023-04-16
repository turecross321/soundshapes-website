import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
} from "react";

export type User = {
  username: string;
  userId: string;
  sessionId: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<Partial<UserContextInterface>>({});

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    username: "",
    userId: "",
    sessionId: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
