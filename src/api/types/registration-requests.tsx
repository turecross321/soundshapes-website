export interface SetEmailRequest {
  Email: string;
}

export interface SetPasswordRequest {
  PasswordSha512: string;
}

export interface GetPasswordSessionRequest {
  Email: string;
}
