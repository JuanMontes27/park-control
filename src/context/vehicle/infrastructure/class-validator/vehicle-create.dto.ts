import { IsInt, IsString, Matches } from 'class-validator';

export class VehicleCreateDto {
  @IsString()
  @Matches(/^[A-Z0-9]{6,7}$/, {
    message:
      'The license plate must be 6 or 7 characters long and contain only uppercase letters (A-Z) and digits (0-9)',
  })
  licensePlate: string;

  @IsInt()
  typeId: number;
}
