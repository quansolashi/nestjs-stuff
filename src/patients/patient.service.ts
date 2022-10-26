import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().populate('diseasetypes').exec();
  }

  async findOne(id: string): Promise<Patient> {
    return this.patientModel.findOne({ _id: id }).exec();
  }

  async createOne(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new this.patientModel(createPatientDto);
    return patient.save();
  }

  async updateOne(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.patientModel.findOneAndUpdate(
      { _id: id },
      updatePatientDto,
      { new: true },
    );

    return patient;
  }
}
