export interface IAuth {
  _id?: string;
  username: string;
  password?: string;
  chatId: string;
  name?: string;
  age?: number;
  location?: string;
  gender?: "male" | "female";
  goal?: "love" | "friendship" | "communication" | "dating";
  photo?: string;
  action?: string;
  language_code?: "uz" | "ru" | "en";
  bio?: string;
  last_active?: Date;
  online: boolean;
  socket_id?: string;
}
