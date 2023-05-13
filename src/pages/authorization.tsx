import { FC, useState } from "react";
import SessionProvider, { SessionContext } from "@/contexts/SessionContext";
import { useContext, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import {
  AuthorizeIpAddress,
  GetIpAddresses,
  UnAuthorizeIpAddress,
} from "@/api/api-ip-authorization";
import UnAuthorizedIp from "@/components/unauthorized-ip";
import AuthorizedIp from "@/components/authorized-ip";
import { IpResponse } from "@/api/types/ip-authorization-responses";
import EnforceAuthentication from "@/components/enforce-authentication";
import { AuthenticationResponse } from "@/api/types/authentication-responses";
import Divider from "@/components/divider";
import AutoLogin from "@/components/auto-login";

interface AuthorizationProps {}

const Authorization: FC<AuthorizationProps> = ({}) => {
  const router = useRouter();
  const { session } = useContext(SessionContext);

  const [authorizedIps, setAuthorizedIps] = useState<IpResponse[]>();
  const [unAuthorizedIps, setUnAuthorizedIps] = useState<IpResponse[]>();

  async function Refresh() {
    if (!session) return;

    let addresses = await GetIpAddresses();
    let authed: IpResponse[] = [];
    let unAuthed: IpResponse[] = [];

    addresses?.IpAddresses.forEach((element) => {
      if (element.Authorized) {
        authed.push(element);
      } else {
        unAuthed.push(element);
      }
    });

    if (!authed || !unAuthed) {
      location.assign("/");
      return;
    }

    setAuthorizedIps(authed);
    setUnAuthorizedIps(unAuthed);
  }

  useEffect(() => {
    const getIps = async () => {
      return Refresh();
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
      newIps = [
        ...authorizedIps,
        { IpAddress: ip, Authorized: true, OneTimeUse: once },
      ];
    else newIps = [{ IpAddress: ip, Authorized: true, OneTimeUse: once }];
    setAuthorizedIps(newIps);
  }

  function RemoveAuthorizedIp(ip: string) {
    let newIps: IpResponse[];

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
    let newIps: IpResponse[];

    if (unAuthorizedIps) {
      let ipToRemove: IpResponse = {
        IpAddress: ip,
        Authorized: false,
        OneTimeUse: false,
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
