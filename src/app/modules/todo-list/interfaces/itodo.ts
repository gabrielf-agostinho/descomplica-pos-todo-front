import { ICommon } from "src/app/shared/interfaces/icommon";

export interface ITodo extends ICommon {
  title: string;
  description: string;
  userId: number;
  finished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
