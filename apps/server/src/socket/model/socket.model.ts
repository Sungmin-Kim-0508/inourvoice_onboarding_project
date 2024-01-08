import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Channel } from 'src/channel/model/channel.model';
import { Member } from 'src/member/model/member.model';

export type SocketDocument = HydratedDocument<Socket>;

const options: SchemaOptions = {
  collection: 'socket',
  timestamps: true,
};

@Schema(options)
export class Socket {
  @Prop({})
  socket_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  member: Member;

  @Prop({ type: Date, required: false })
  deleted_at?: Date;
}

export const SocketSchema = SchemaFactory.createForClass(Socket);
