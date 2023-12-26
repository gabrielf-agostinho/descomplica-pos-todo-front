import { IUser } from "./iuser";

export interface IToken {
  secret: string;
  refresh: string;
  createdAt: Date;
  expiresAt: Date;
  user: IUser;
}
