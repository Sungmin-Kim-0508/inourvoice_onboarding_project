import { Message } from "./Message";
import { Socket } from "./Socket";
import { User } from "./User";

type ChannelCategory = "general" | "dm";

export interface Channel {
  _id: string;
  creator: User;
  sockets: [Socket];
  messages: [Message];
  title: string;
  subject: string;
  description: string;
  category: ChannelCategory;
  created_at: string;
  updated_at: string;
}
