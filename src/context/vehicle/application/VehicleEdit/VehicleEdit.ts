import { VehicleTypeError } from '../../../vehicle-type/domain';
import {
  VehicleError,
  VehicleRepository,
  VehicleTypeService,
} from '../../domain';
import { VehicleEditDto } from './dto/VehicleEditDto';

export class VehicleEdit {
  constructor(
    private vehicleRepository: VehicleRepository,
    private vehicleTypeService: VehicleTypeService,
  ) {}

  async run(id: number, partialVehicle: VehicleEditDto) {
    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle) throw new VehicleError('This vehicle does not exits');

    const vehicleTypeId = partialVehicle?.typeId
      ? partialVehicle.typeId
      : vehicle.id;

    const vehicleType =
      await this.vehicleTypeService.getVehicleTypeById(vehicleTypeId);

    if (!vehicleType)
      throw new VehicleTypeError(
        'The vehicle type that you want to update does not exist',
      );

    vehicle.licensePlate = partialVehicle.licensePlate ?? vehicle.licensePlate;
    vehicle.type = vehicleType;

    return this.vehicleRepository.edit(vehicle);
  }
}
