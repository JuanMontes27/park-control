import { VehicleError, VehicleRepository } from '../../domain';

export class VehicleGetById {
  constructor(private vehicleRepository: VehicleRepository) {}

  async run(id: number) {
    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle)
      throw new VehicleError(`Vehilce with ID: ${id} does not exist`);

    return vehicle.toObject();
  }
}
