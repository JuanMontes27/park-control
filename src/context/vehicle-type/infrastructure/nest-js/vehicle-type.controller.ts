import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VehicleTypeCreateDto } from '../class-validator/vehicle-type-create.dto';
import {
  VehicleTypeCreate,
  VehicleTypeEdit,
  VehicleTypeGetAll,
  VehicleTypeGetById,
  VehicleTypeRemove,
} from '../../application';
import { VehicleTypeError } from '../../domain';
import { VehicleTypeUpdate } from '../class-validator/vehicle-type-update.dto';

@Controller('vehicle-types')
export class VehicleTypeController {
  constructor(
    @Inject('VehicleTypeGetAll')
    private readonly vehicleTypeGetAll: VehicleTypeGetAll,
    @Inject('VehicleTypeCreate')
    private readonly vehicleTypeCreate: VehicleTypeCreate,
    @Inject('VehicleTypeGetById')
    private readonly vehicleTypeGetById: VehicleTypeGetById,
    @Inject('VehicleTypeEdit')
    private readonly vehicleTypeEdit: VehicleTypeEdit,
    @Inject('VehicleTypeRemove')
    private readonly vehicleTypeRemove: VehicleTypeRemove,
  ) {}

  @Get()
  async getAll() {
    return this.vehicleTypeGetAll.run();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      const vehicleType = await this.vehicleTypeGetById.run(id);

      return vehicleType;
    } catch (error) {
      if (error instanceof VehicleTypeError) {
        return new HttpException(error.message, HttpStatus.FORBIDDEN);
      }

      return new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() body: VehicleTypeCreateDto) {
    const { name, ratePerMinute } = body;
    return this.vehicleTypeCreate.run(name, ratePerMinute);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: VehicleTypeUpdate) {
    const { name, ratePerMinute } = body;

    try {
      await this.vehicleTypeEdit.run(id, {
        name,
        ratePerMinute,
      });

      return { message: 'Vehicle type updated' };
    } catch (error) {
      if (error instanceof VehicleTypeError) {
        return new HttpException(error.message, HttpStatus.FORBIDDEN);
      }

      return new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.vehicleTypeRemove.run(id);

      return { message: 'Vehicle type deleted' };
    } catch (error) {
      if (error instanceof VehicleTypeError) {
        return new HttpException(error.message, HttpStatus.FORBIDDEN);
      }

      return new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
