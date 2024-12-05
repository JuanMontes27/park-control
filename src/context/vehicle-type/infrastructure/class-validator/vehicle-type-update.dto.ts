import { PartialType } from '@nestjs/mapped-types';
import { VehicleTypeCreateDto } from './vehicle-type-create.dto';

export class VehicleTypeUpdate extends PartialType(VehicleTypeCreateDto) {}
