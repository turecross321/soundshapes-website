export interface AuthorizeIpRequest {
  IpAddress: string;
  OneTimeUse: boolean;
}

export interface UnAuthorizeIpRequest {
  IpAddress: string;
}
