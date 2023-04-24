import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useContext, useState } from "react";
import NavbarButton from "./navbar-button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Divider from "./divider";

function Navbar() {
  const { session } = useContext(SessionContext);
  const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);

  const DefaultMenus: JSX.Element[] = [
    <NavbarButton url="/" name="Home" key="home" />,
    <NavbarButton url="/levels" name="Levels" key="levels" />,
  ];

  const LoggedInMenus: JSX.Element[] = [
    <NavbarButton
      url="/authorization"
      name="Authorization"
      key="authorization"
    />,
    <NavbarButton
      url={`/profile/${session?.UserId}`}
      name="Profile"
      key="profile"
    />,
  ];

  const NotLoggedInMenus: JSX.Element[] = [
    <NavbarButton url="/login" name="Login" key="login" />,
  ];

  function ToggleMobileNavbar() {
    setShowMobileNavbar(!showMobileNavbar);
  }

  function GetLoggedInOrNotLoggedInButtons() {
    return session?.UserId ? LoggedInMenus : NotLoggedInMenus;
  }

  return (
    <>
      <nav className="w-full p-5 bg-black bg-opacity-50 backdrop-blur-xl border-b border-slate-200 border-opacity-10 shadow-sm">
        <div className="md:hidden flex justify-end">
          <button onClick={ToggleMobileNavbar}>
            {showMobileNavbar ? (
              <XMarkIcon className="w-8" />
            ) : (
              <Bars3Icon className="w-8" />
            )}
          </button>
        </div>

        {showMobileNavbar ? (
          <div className="items-center w-fill text-center md:hidden ease-in duration-300 space-y-2">
            {DefaultMenus.concat(
              session?.Id ? LoggedInMenus : NotLoggedInMenus
            ).map((menu, index) => (
              <div key={`mobile-${index}`}>
                <div className="text-2xl">{menu}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="md:block max-xl:hidden">
          <div className="flex justify-between items-center">
            <div className="flex">
              {DefaultMenus.map((menu, index) => (
                <div className="mr-6" key={`default-${index}`}>
                  {menu}
                </div>
              ))}
            </div>
            <div className="flex">
              {GetLoggedInOrNotLoggedInButtons().map((menu, index) => (
                <div className="ml-6" key={`default-${index}`}>
                  {menu}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
