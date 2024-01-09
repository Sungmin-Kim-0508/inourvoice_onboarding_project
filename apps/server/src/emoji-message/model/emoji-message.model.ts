import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Channel } from 'src/channel/model/channel.model';
import { Emoji } from 'src/emoji/model/emoji.model';
import { Member } from 'src/member/model/member.model';
import { Message } from 'src/message/model/message.model';

export type EmojiMessageDocument = HydratedDocument<EmojiMessage>;

const options: SchemaOptions = {
  collection: 'emoji_message',
  timestamps: true,
};

@Schema(options)
export class EmojiMessage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  channel: Channel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  member: Member;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  message: Message;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Emoji' })
  emoji: Emoji;
}

export const EmojiMessageSchema = SchemaFactory.createForClass(EmojiMessage);
