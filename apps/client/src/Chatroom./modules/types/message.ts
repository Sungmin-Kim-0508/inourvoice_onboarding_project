// TODO: API 연동 시 데이터에 맞게 수정
export interface MessageType {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  content: string;
  user: {
    name: string;
    profile: string;
  };
  isHeadOfMessage: boolean;
}
