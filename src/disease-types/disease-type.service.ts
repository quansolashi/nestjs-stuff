import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Diseasetype,
  DiseasetypeDocument,
} from './schemas/disease-type.schema';

@Injectable()
export class DiseasetypeService {
  constructor(
    @InjectModel(Diseasetype.name)
    private diseasetypeModel: Model<DiseasetypeDocument>,
  ) {}

  async findAll(): Promise<Diseasetype[]> {
    return this.diseasetypeModel.find().exec();
  }
}
