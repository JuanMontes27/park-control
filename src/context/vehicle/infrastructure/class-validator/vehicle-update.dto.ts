import { PartialType } from '@nestjs/mapped-types';
import { VehicleCreateDto } from './vehicle-create.dto';

export class VehicleUpdateDto extends PartialType(VehicleCreateDto) {}
