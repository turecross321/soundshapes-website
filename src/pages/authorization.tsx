import { FC, useState } from "react";
import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useContext, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import {
  AuthorizeIpAddress,
  GetAuthorizedIpAddresses,
  GetUnAuthorizedIpAddresses,
  UnAuthorizeIpAddress,
} from "@/api/api-ip-authorization";
import UnAuthorizedIp from "@/components/unauthorized-ip";
import AuthorizedIp from "@/components/authorized-ip";
import {
  AuthorizedIpResponse,
  UnAuthorizedIpResponse,
} from "@/api/types/ip-authorization-responses";
import EnforceAuthentication from "@/components/enforce-authentication";
import { AuthenticationResponse } from "@/api/types/authentication-responses";
import Divider from "@/components/divider";

async function RefreshAuthed(user: AuthenticationResponse, router: NextRouter) {
  let authed = await GetAuthorizedIpAddresses();

  if (authed === null) {
    router.push("login");
    return;
  }

  return authed;
}

async function RefreshUnAuthed(
  user: AuthenticationResponse,
  router: NextRouter
) {
  let unAuthed = await GetUnAuthorizedIpAddresses();

  if (unAuthed === null) {
    router.push("login");
    return;
  }

  return unAuthed;
}

interface AuthorizationProps {}

const Authorization: FC<AuthorizationProps> = ({}) => {
  const router = useRouter();
  const { session } = useContext(SessionContext);

  const [authorizedIps, setAuthorizedIps] = useState<AuthorizedIpResponse[]>();
  const [unAuthorizedIps, setUnAuthorizedIps] =
    useState<UnAuthorizedIpResponse[]>();

  async function Refresh() {
    if (!session) return;

    let authed = await RefreshAuthed(session, router);
    let unAuthed = await RefreshUnAuthed(session, router);

    setAuthorizedIps(authed);
    setUnAuthorizedIps(unAuthed);
  }

  useEffect(() => {
    const getIps = async () => {
      Refresh();
    };

    // Call getIps immediately
    getIps();

    // Call getIps every 5 seconds
    const intervalId = setInterval(getIps, 5000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [session, router]);

  async function AuthorizeIp(ip: string, once: boolean) {
    if (!session) return;

    AddAuthorizedIp(ip, once);
    RemoveUnAuthorizedIp(ip, once);

    await AuthorizeIpAddress(ip, once);
  }

  async function UnAuthorizeIp(ip: string) {
    if (!session) return;

    RemoveAuthorizedIp(ip);

    await UnAuthorizeIpAddress(ip);
  }

  function AddAuthorizedIp(ip: string, once: boolean) {
    let newIps;

    if (authorizedIps)
      newIps = [...authorizedIps, { IpAddress: ip, OneTimeUse: once }];
    else newIps = [{ IpAddress: ip, OneTimeUse: once }];
    setAuthorizedIps(newIps);
  }

  function RemoveAuthorizedIp(ip: string) {
    let newIps: AuthorizedIpResponse[];

    if (authorizedIps) {
      let indexToRemove = authorizedIps.findIndex((i) => i.IpAddress == ip);

      newIps = [...authorizedIps];
      if (indexToRemove !== -1) {
        newIps.splice(indexToRemove, 1);
      }
    } else newIps = [];
    setAuthorizedIps(newIps);
  }

  function RemoveUnAuthorizedIp(ip: string, once: boolean) {
    let newIps: UnAuthorizedIpResponse[];

    if (unAuthorizedIps) {
      let ipToRemove: UnAuthorizedIpResponse = {
        IpAddress: ip,
      };
      let indexToRemove = unAuthorizedIps.findIndex(
        (i) => i.IpAddress === ipToRemove.IpAddress
      );

      newIps = [...unAuthorizedIps];
      if (indexToRemove !== -1) {
        newIps.splice(indexToRemove, 1);
      }
    } else newIps = [];
    setUnAuthorizedIps(newIps);
  }

  return (
    <EnforceAuthentication shouldBeAuthenticated={true}>
      <div className="content content-padding">
        <h1 className="text-5xl font-bold text-center mb-2">Authorization</h1>

        <div>
          <h2 className="text-2xl mb-2">Allowed</h2>
        </div>

        <Divider />

        {authorizedIps
          ? authorizedIps.map((ip) => (
              <AuthorizedIp
                address={ip.IpAddress}
                once={ip.OneTimeUse}
                removeAuthenticatedIpCallback={UnAuthorizeIp}
              />
            ))
          : null}

        <Divider />

        <div>
          <h2 className="text-2xl mb-2">Requests</h2>
        </div>

        <Divider />

        {unAuthorizedIps
          ? unAuthorizedIps.map((ip) => (
              <UnAuthorizedIp
                address={ip.IpAddress}
                authorizeIpCallback={AuthorizeIp}
                unAuthorizeIpCallback={UnAuthorizeIp}
              />
            ))
          : null}

        <Divider />
      </div>
    </EnforceAuthentication>
  );
};

export default Authorization;
