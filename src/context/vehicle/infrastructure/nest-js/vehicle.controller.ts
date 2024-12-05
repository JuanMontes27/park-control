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
import {
  VehicleChargeAmount,
  VehicleCreate,
  VehicleEdit,
  VehicleFilter,
  VehicleGetAll,
  VehicleGetById,
  VehicleRemove,
} from '../../application';
import { VehicleCreateDto } from '../class-validator/vehicle-create.dto';
import { VehicleError } from '../../domain';
import { VehicleUpdateDto } from '../class-validator/vehicle-update.dto';
import { ValidateId } from 'src/context/shared/infrastructure/class-validator/validate-id';
import { VehicleFilterDto } from '../class-validator/vehicle-filter.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(
    @Inject('VehicleGetAll')
    private readonly vehicleGetAll: VehicleGetAll,
    @Inject('VehicleGetById')
    private readonly vehicleGetById: VehicleGetById,
    @Inject('VehicleCreate')
    private readonly vehicleCreate: VehicleCreate,
    @Inject('VehicleEdit')
    private readonly vehicleEdit: VehicleEdit,
    @Inject('VehicleRemove')
    private readonly vehicleRemove: VehicleRemove,
    @Inject('VehicleChargeAmount')
    private readonly vehicleChargeAmount: VehicleChargeAmount,
    @Inject('VehicleFilter')
    private readonly vehicleFilter: VehicleFilter,
  ) {}

  @Get()
  async getAll() {
    return this.vehicleGetAll.run();
  }

  @Get(':id')
  async getById(@Param() params: ValidateId) {
    const { id } = params;

    try {
      return await this.vehicleGetById.run(+id);
    } catch (error) {
      const message =
        error instanceof VehicleError ? error.message : 'INTERNAL SERVER ERROR';

      const status =
        error instanceof VehicleError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return new HttpException(message, status);
    }
  }

  @Post()
  async create(@Body() body: VehicleCreateDto) {
    const { licensePlate, typeId } = body;

    try {
      await this.vehicleCreate.run(licensePlate, typeId);
    } catch (error) {
      const message =
        error instanceof VehicleError ? error.message : 'INTERNAL SERVER ERROR';

      const status =
        error instanceof VehicleError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return new HttpException(message, status);
    }

    return { message: 'Vehicle created' };
  }

  @Post('filter')
  async getVehiclesByFilter(@Body() body: VehicleFilterDto) {
    const { date, hour } = body;

    try {
      return await this.vehicleFilter.run({ date, hour });
    } catch (error) {
      console.log(error);

      const message =
        error instanceof VehicleError ? error.message : 'INTERNAL SERVER ERROR';

      const status =
        error instanceof VehicleError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return new HttpException(message, status);
    }
  }

  @Patch('/charge-amount/:id')
  async ChargeAmount(@Param() params: ValidateId) {
    const { id } = params;

    try {
      return await this.vehicleChargeAmount.run(+id);
    } catch (error) {
      const message =
        error instanceof VehicleError ? error.message : 'INTERNAL SERVER ERROR';

      const status =
        error instanceof VehicleError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return new HttpException(message, status);
    }
  }

  @Patch(':id')
  async edit(@Param() params: ValidateId, @Body() body: VehicleUpdateDto) {
    const { id } = params;
    const { licensePlate, typeId } = body;

    try {
      await this.vehicleEdit.run(+id, {
        licensePlate,
        typeId,
      });
    } catch (error) {
      const message =
        error instanceof VehicleError ? error.message : 'INTERNAL SERVER ERROR';

      const status =
        error instanceof VehicleError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return new HttpException(message, status);
    }

    return { message: 'Vehicle Updated' };
  }

  @Delete(':id')
  async remove(@Param() params: ValidateId) {
    const { id } = params;

    try {
      await this.vehicleRemove.run(+id);
    } catch (error) {
      const message =
        error instanceof VehicleError ? error.message : 'INTERNAL SERVER ERROR';

      const status =
        error instanceof VehicleError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.INTERNAL_SERVER_ERROR;

      return new HttpException(message, status);
    }

    return { message: 'Vehicle deleted' };
  }
}
