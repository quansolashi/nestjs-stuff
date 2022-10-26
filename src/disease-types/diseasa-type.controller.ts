import { Controller, Get } from '@nestjs/common';
import { DiseasetypeService } from './disease-type.service';
import { Diseasetype } from './schemas/disease-type.schema';

@Controller('disease-types')
export class DiseasetypeController {
  constructor(private diseasetypeService: DiseasetypeService) {}

  @Get()
  async findAll(): Promise<Diseasetype[]> {
    return this.diseasetypeService.findAll();
  }
}
