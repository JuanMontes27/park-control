import { VehicleTypeError, VehicleTypeRepository } from '../../domain';
import { VehicleTypeEditDto } from './dto/VehicleTypeEditDto';

export class VehicleTypeEdit {
  constructor(private vehicleTypeRepository: VehicleTypeRepository) {}

  async run(id: number, partialVehicleType: VehicleTypeEditDto): Promise<void> {
    const vehicleType = await this.vehicleTypeRepository.getById(id);

    if (!vehicleType)
      throw new VehicleTypeError('This vehicle type ID does not exist');

    vehicleType.name = partialVehicleType.name ?? vehicleType.name;
    vehicleType.ratePerMinute =
      partialVehicleType.ratePerMinute ?? vehicleType.ratePerMinute;

    this.vehicleTypeRepository.edit(vehicleType);
  }
}
