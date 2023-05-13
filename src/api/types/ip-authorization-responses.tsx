export interface IpResponse {
  IpAddress: string;
  Authorized: boolean;
  OneTimeUse: boolean;
}

export interface IpWrapper {
  IpAddresses: IpResponse[];
  Count: number;
}
