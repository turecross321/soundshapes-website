export interface AuthorizedIpResponseWrapper {
  IpAddresses: AuthorizedIpResponse[];
}

export interface AuthorizedIpResponse {
  IpAddress: string;
  OneTimeUse: boolean;
}

export interface UnAuthorizedIpResponseWrapper {
  IpAddresses: UnAuthorizedIpResponse[];
}

export interface UnAuthorizedIpResponse {
  IpAddress: string;
}
