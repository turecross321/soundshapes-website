export interface SetEmailRequest {
  NewEmail: string;
}

export interface SetPasswordRequest {
  NewPasswordSha512: string;
}

export interface GetPasswordSessionRequest {
  Email: string;
}
