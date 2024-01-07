import { ChannelAttributes } from "./Channel";

// TODO: 소켓 연결 후 실제 데이터 타입에 맞게 수정
export interface UserAttributes {
  id: string;
  channels: ChannelAttributes[];
  email: string;
  name: string;
  nickname: string;
  password: string;
  phone: string;
  profile: string;
  description: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}
