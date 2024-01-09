import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Member } from 'src/member/model/member.model';
import { Message } from 'src/message/model/message.model';
import { Socket } from 'src/socket/model/socket.model';

export type ChannelDocument = HydratedDocument<Channel>;

const options: SchemaOptions = {
  collection: 'channel',
  timestamps: true,
};

type ChannelCategory = 'general' | 'dm';

@Schema(options)
export class Channel {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  creator: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Socket' }])
  sockets: [Socket];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
  messages: [Message];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subject: string;

  @Prop()
  description: string;

  @Prop({ default: 'general' })
  category: ChannelCategory;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
