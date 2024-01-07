import { MessageAttributes } from "../../../Chatroom./modules/types/message";
import { UserAttributes } from "./User";

// TODO: 소켓 연결 후 실제 데이터 타입에 맞게 수정
export interface ChannelAttributes {
  _id: string;
  workspace_id: number;
  creator: UserAttributes;
  sockets: null;
  messages: MessageAttributes[];
  title: string;
  subject: string | null;
  description: string | null;
  category: ChannelCategory;
  created_at: string;
  updated_at: string;
}

export type ChannelCategory = "general" | "dm";
