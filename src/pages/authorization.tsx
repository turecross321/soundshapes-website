import { FC } from "react";
import UserProvider, { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Router, useRouter } from "next/router";

interface AuthorizationProps {}

const Authorization: FC<AuthorizationProps> = ({}) => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.sessionId) router.push("login");
  });

  return (
    <div className="w-auto">
      <h1 className="text-5xl font-bold text-center mb-2">IP Authorization</h1>

      <div>
        <h2 className="text-xl mb-2">Authorized</h2>
      </div>

      <div className="border-t border-gray-300 my-1 border-opacity-20" />

      <div>
        <h2 className="text-xl mb-2">Requests</h2>
      </div>

      <div className="border-t border-gray-300 my-1 border-opacity-20" />
    </div>
  );
};

export default Authorization;
