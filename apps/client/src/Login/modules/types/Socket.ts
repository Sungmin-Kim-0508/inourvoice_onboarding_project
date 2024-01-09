import { User } from "./User";

export interface Socket {
  socket_id: string;
  member: User;
  deleted_at?: Date;
}
