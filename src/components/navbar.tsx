import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useContext } from "react";
import NavbarButton from "./navbar-button";

function Navbar() {
  const { session } = useContext(SessionContext);

  return (
    <nav className="w-full p-5 bg-black bg-opacity-50 ease-in duration-300 flex justify-between backdrop-blur-xl border-b border-slate-200 border-opacity-10 shadow-sm items-center">
      <div>
        <NavbarButton url="/" name="Home" />
      </div>
      <div>
        {session?.UserId ? (
          <div className="flex">
            <NavbarButton url="/authorization" name="Authorization" />
            <NavbarButton url={`/profile/${session.UserId}`} name="Profile" />
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
