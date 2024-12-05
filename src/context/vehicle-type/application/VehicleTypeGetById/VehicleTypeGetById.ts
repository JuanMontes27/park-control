import { VehicleTypeError, VehicleTypeRepository } from '../../domain';

export class VehicleTypeGetById {
  constructor(private vehicleTypeRepository: VehicleTypeRepository) {}

  async run(id: number) {
    const vehicleType = await this.vehicleTypeRepository.getById(id);

    if (!vehicleType)
      throw new VehicleTypeError('This vehicle type ID does not exist');

    return {
      id: vehicleType.id,
      name: vehicleType.name,
      ratePerMinute: vehicleType.ratePerMinute,
    };
  }
}
