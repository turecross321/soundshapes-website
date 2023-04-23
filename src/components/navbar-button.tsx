import Link from "next/link";
import { FC } from "react";

interface NavbarButtonProps {
  url: string;
  name: string;
}

const NavbarButton: FC<NavbarButtonProps> = ({ url, name }) => {
  return (
    <div className="navbar-button">
      <Link href={url}>{name}</Link>
    </div>
  );
};

export default NavbarButton;
