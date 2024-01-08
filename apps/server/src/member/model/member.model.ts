import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Channel } from 'src/channel/model/channel.model';

export type MemberDocument = HydratedDocument<Member>;

const options: SchemaOptions = {
  collection: 'member',
  timestamps: true,
};

@Schema(options)
export class Member {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }])
  channels: [Channel];

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  profile: string;

  @Prop()
  description: string;

  //MEMO: 업무 중 등 여러가지 상태
  @Prop({ default: false })
  status: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
