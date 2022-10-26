import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientService } from './patient.service';
import { Patient } from './schemas/patient.schema';

@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createOne(@Body() patientData: CreatePatientDto): Promise<Patient> {
    return this.patientService.createOne(patientData);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() patientData: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientService.updateOne(id, patientData);
  }
}
