import { VehicleError, VehicleRepository } from '../../domain';

export class VehicleRemove {
  constructor(private vehicleRepository: VehicleRepository) {}

  async run(id: number): Promise<void> {
    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle)
      throw new VehicleError(`Vehilce with ID: ${id} does not exist`);

    return this.vehicleRepository.remove(id);
  }
}
