import { IUser } from "./user-interface";
export interface IAuth extends IUser {
  username: string;
  password?: string;
}

export interface IAdmin {
  _id: string;
  chatId: string;
  username: string;
  password?: string;
}
