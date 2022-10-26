import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiseasetypeController } from './diseasa-type.controller';
import { DiseasetypeService } from './disease-type.service';
import { Diseasetype, DiseasetypeSchema } from './schemas/disease-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Diseasetype.name, schema: DiseasetypeSchema },
    ]),
  ],
  controllers: [DiseasetypeController],
  providers: [DiseasetypeService],
})
export class DiseaseTypeModule {}
