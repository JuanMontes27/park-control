import { VehicleTypeError, VehicleTypeRepository } from '../../domain';

export class VehicleTypeRemove {
  constructor(private vehicleTypeRepository: VehicleTypeRepository) {}

  async run(id: number): Promise<void> {
    const vehicleType = await this.vehicleTypeRepository.getById(id);

    if (!vehicleType)
      throw new VehicleTypeError('This vehicle type ID does not exist');

    return this.vehicleTypeRepository.remove(id);
  }
}
