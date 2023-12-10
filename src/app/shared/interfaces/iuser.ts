import { ICommon } from "./icommon";

export interface IUser extends ICommon {
  name: string;
  email: string;
}

export interface IUserWithPassword extends IUser {
  password: string;
}