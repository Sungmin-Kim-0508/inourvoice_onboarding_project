import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Channel } from 'src/channel/model/channel.model';
import { Emoji } from 'src/emoji/model/emoji.model';
import { Member } from 'src/member/model/member.model';
import { Socket } from 'src/socket/model/socket.model';

export type MessageDocument = HydratedDocument<Message>;

const options: SchemaOptions = {
  collection: 'message',
  timestamps: true,
};

@Schema(options)
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  member: Member;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  channel: Channel;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Emoji' }])
  emojis: [Emoji?];

  @Prop({})
  content: string;

  @Prop({ default: false })
  is_deleted: boolean;

  @Prop({ type: Date, required: false })
  deleted_at?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
