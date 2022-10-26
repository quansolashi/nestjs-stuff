import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly address?: string;
}
