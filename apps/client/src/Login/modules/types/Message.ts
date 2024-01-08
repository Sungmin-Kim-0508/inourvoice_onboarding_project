import { Channel } from "./Channel";
import { Emoji } from "./Emoji";
import { User } from "./User";

export interface Message {
  member: User;
  channel: Channel;
  emojis: [Emoji];
  content: string;
  is_deleted: boolean;
  deleted_at?: Date;
}
