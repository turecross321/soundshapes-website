import UserProvider, { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";

const SaveLoginDetails: FC = ({}) => {
  try {
    // This tries to
    const username = sessionStorage.getItem("username");
    const userId = sessionStorage.getItem("userId");
    const sessionId = sessionStorage.getItem("sessionId");

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
      if (username && userId && sessionId && setUser) {
        setUser({
          username: username,
          userId: userId,
          sessionId: sessionId,
        });
      }
    }, []);
  } catch (error) {}
  return null;
};

export default SaveLoginDetails;
