import UserProvider, { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="w-full p-5 bg-black bg-opacity-50 ease-in duration-300 flex justify-between backdrop-blur-xl border-b border-slate-200 border-opacity-10 shadow-sm items-center">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        {user?.sessionId ? (
          <Link href={`/profile/${user.userId}`}>Profile</Link>
        ) : (
          <Link href="/login">Log in</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
