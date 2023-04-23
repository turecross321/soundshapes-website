import { FC } from "react";

interface UnAuthorizedIpProps {
  address: string;
  authorizeIpCallback: (ip: string, once: boolean) => void;
  unAuthorizeIpCallback: (ip: string) => void;
}

const UnAuthorizedIp: FC<UnAuthorizedIpProps> = ({
  address,
  authorizeIpCallback,
  unAuthorizeIpCallback,
}) => {
  const AuthorizeIpIndefinitely = () => {
    authorizeIpCallback(address, false);
  };

  const AuthorizeIpOnce = () => {
    authorizeIpCallback(address, true);
  };

  const UnAuthorizeIp = () => {
    unAuthorizeIpCallback(address);
  };

  return (
    <div className="mb-2">
      <h1 className="text-xl mb-1">{address}</h1>
      <button
        className="button bg-green-600 text-white py-2 rounded hover:bg-green-500 transistion-colors mr-2 text-s"
        onClick={AuthorizeIpIndefinitely}
      >
        Always Allow
      </button>
      <button
        className="button bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500 transistion-colors mr-2 text-s"
        onClick={AuthorizeIpOnce}
      >
        Allow Once
      </button>
      <button
        className="button bg-red-600 text-white py-2 rounded hover:bg-red-500 transistion-colors text-s"
        onClick={UnAuthorizeIp}
      >
        Don't Allow
      </button>
    </div>
  );
};

export default UnAuthorizedIp;
