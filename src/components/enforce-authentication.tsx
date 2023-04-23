import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useRouter } from "next/router";
import { FC, ReactNode, useContext, useEffect } from "react";

interface RequireAuthenticationProps {
  children: ReactNode;
  shouldBeAuthenticated: boolean;
}

const EnforceAuthentication: FC<RequireAuthenticationProps> = ({
  children,
  shouldBeAuthenticated,
}) => {
  const { session } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    console.log();

    if (session?.Id == null && shouldBeAuthenticated == true)
      router.push("login");
    else if (session?.Id !== "" && !shouldBeAuthenticated) router.push("/");
  });

  return <div>{children}</div>;
};

export default EnforceAuthentication;
