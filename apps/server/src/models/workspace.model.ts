import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkspaceDocument = HydratedDocument<Workspace>;

const options: SchemaOptions = {
  collection: 'workspace',
  timestamps: true,
};

@Schema(options)
export class Workspace {
  @Prop({ required: true })
  name: string;

  @Prop()
  icon_url: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
