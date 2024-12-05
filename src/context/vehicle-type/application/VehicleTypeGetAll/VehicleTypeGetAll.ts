import { VehicleTypeRepository } from '../../domain';

export class VehicleTypeGetAll {
  constructor(private vehicleTypeRepository: VehicleTypeRepository) {}

  async run() {
    const vehicleTypes = await this.vehicleTypeRepository.getAll();

    return vehicleTypes.map((vehicleType) => vehicleType.toObject());
  }
}
