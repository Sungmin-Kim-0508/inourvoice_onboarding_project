import { Channel } from "./Channel";

export interface User {
  channels: Array<Channel>;
  _id: string;
  name: string;
  nickname: string;
  profile: string;
  email: string;
  password: string;
  createAt: Date;
  updatedAt: Date;
}
