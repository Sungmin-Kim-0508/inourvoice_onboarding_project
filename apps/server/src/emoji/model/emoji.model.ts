import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Member } from 'src/member/model/member.model';

export type EmojiDocument = HydratedDocument<Emoji>;

const options: SchemaOptions = {
  collection: 'emoji',
  timestamps: true,
};

@Schema(options)
export class Emoji {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  creator: Member;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  sender: Member;

  @Prop()
  symbol: string;

  @Prop({ default: false })
  is_deleted: boolean;

  @Prop({ type: Date, required: false })
  deleted_at?: Date;
}

export const EmojiSchema = SchemaFactory.createForClass(Emoji);
