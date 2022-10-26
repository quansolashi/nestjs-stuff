import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export type DiseasetypeDocument = Diseasetype & Document;

@Schema()
export class Diseasetype {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;
}

export const DiseasetypeSchema = SchemaFactory.createForClass(Diseasetype);
