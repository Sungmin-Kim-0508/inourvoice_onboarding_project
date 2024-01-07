import { ChannelAttributes } from "../../../common/modules/types/Channel";
import { UserAttributes } from "../../../common/modules/types/User";

// TODO: 소켓 연결 후 실제 데이터 타입에 맞게 수정
export interface MessageAttributes {
  _id: string;
  member: UserAttributes;
  channel: ChannelAttributes;
  emojis: EmojiAttributes[] | null;
  content: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// TODO: 소켓 연결 후 실제 데이터 타입에 맞게 수정
export interface EmojiAttributes {
  id: string;
  creator: UserAttributes;
  sender: UserAttributes;
  symbol: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
