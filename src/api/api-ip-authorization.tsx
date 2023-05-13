import { api } from "./api-client";
import {
  AuthorizeIpRequest,
  UnAuthorizeIpRequest,
} from "./types/ip-authorization-requests";
import { IpWrapper } from "./types/ip-authorization-responses";

export async function GetIpAddresses() {
  try {
    let response = await api.get<IpWrapper>("ip/addresses");

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function AuthorizeIpAddress(
  ipAddress: string,
  oneTimeUse: boolean
) {
  let body: AuthorizeIpRequest = {
    IpAddress: ipAddress,
    OneTimeUse: oneTimeUse,
  };

  try {
    api.post("ip/authorize", body);
    return true;
  } catch (error) {
    return false;
  }
}

export async function UnAuthorizeIpAddress(ipAddress: string) {
  let body: UnAuthorizeIpRequest = {
    IpAddress: ipAddress,
  };

  try {
    api.post("ip/unAuthorize", body);
    return true;
  } catch (error) {
    return false;
  }
}
