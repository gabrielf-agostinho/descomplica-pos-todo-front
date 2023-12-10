import { IUser } from "./iuser";

export interface IToken {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
  createdAt: Date;
  expiresAt: Date;
  user: IUser;
}
