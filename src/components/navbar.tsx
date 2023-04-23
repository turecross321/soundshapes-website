import UserProvider, { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import NavbarButton from "./navbar-button";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="w-full p-5 bg-black bg-opacity-50 ease-in duration-300 flex justify-between backdrop-blur-xl border-b border-slate-200 border-opacity-10 shadow-sm items-center">
      <div>
        <NavbarButton url="/" name="Home" />
      </div>
      <div>
        {user?.sessionId ? (
          <div className="flex">
            <NavbarButton url="/authorization" name="Authorization" />
            <NavbarButton url={`/profile/${user.userId}`} name="Profile" />
          </div>
        ) : (
          <div>
            <NavbarButton url="/login" name="Login" />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
