import { IsOptional, IsString, Matches } from 'class-validator';

export class VehicleFilterDto {
  @IsOptional()
  @IsString()
  @Matches(/\b(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}\b/, {
    message: 'The date needs the next format: dd-mm-yyyy',
  })
  date?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/, {
    message: 'The hour needs the next fromat: HH:MM:00 PM or AM',
  })
  hour?: string;
}
