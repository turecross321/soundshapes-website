import { FC } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

interface AuthorizedIpProps {
  address: string;
  once: boolean;
  removeAuthenticatedIpCallback: (ip: string, once: boolean) => void;
}

const AuthorizedIp: FC<AuthorizedIpProps> = ({
  address,
  once,
  removeAuthenticatedIpCallback,
}) => {
  function RemoveIp() {
    removeAuthenticatedIpCallback(address, once);
  }

  return (
    <div className="mb-2">
      <div className="flex items-center mb-1">
        <h1 className="text-xl">{address}</h1>
        {once ? <ClockIcon className="ml-1 w-5 h-5" /> : null}
      </div>

      <button
        className="button bg-red-600 text-white py-2 rounded hover:bg-red-500 transistion-colors mr-2 text-s"
        onClick={RemoveIp}
      >
        Remove
      </button>
    </div>
  );
};

export default AuthorizedIp;
