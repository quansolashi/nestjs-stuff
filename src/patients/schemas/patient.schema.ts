import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Diseasetype } from 'src/disease-types/schemas/disease-type.schema';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  address: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Diseasetype.name }])
  diseasetypes: Diseasetype[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
