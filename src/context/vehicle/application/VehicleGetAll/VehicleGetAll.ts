import { VehicleRepository } from '../../domain';

export class VehicleGetAll {
  constructor(private vehicleRepository: VehicleRepository) {}

  async run() {
    const vehicles = await this.vehicleRepository.getAll();

    return vehicles.map((vehicle) => vehicle.toObject());
  }
}
