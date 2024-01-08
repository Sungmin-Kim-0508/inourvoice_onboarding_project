import { Channel } from "./Channel";
import { Emoji } from "./Emoji";
import { User } from "./User";

export interface Message {
  _id: string;
  member: User;
  channel: Channel;
  emojis: [Emoji];
  content: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: Date;
}
