import { Message } from "./Message";
import { Socket } from "./Socket";

type ChannelCategory = "general" | "dm";

export interface Channel {
  creator: string;
  sockets: [Socket];
  messages: [Message];
  title: string;
  subject: string;
  description: string;
  category: ChannelCategory;
}
