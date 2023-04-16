export interface AuthenticationResponse {
  Id: string;
  ExpiresAt: Date;
  UserId: string;
  Username: string;
}

export interface AuthenticationErrorResponse {
  Response: string;
}
