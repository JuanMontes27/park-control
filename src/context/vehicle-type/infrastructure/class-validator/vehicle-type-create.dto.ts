import { IsNumber, IsString, Min } from 'class-validator';

export class VehicleTypeCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  ratePerMinute: number;
}
