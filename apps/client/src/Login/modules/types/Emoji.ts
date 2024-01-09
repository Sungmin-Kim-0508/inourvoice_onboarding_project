import { User } from "./User";

export interface Emoji {
  creator: User;
  sender: User;
  symbol: string;
  is_deleted: boolean;
  deleted_at?: Date;
}
