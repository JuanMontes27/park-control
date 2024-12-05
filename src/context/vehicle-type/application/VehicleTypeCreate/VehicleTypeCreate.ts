import { VehicleType, VehicleTypeRepository } from '../../domain';

export class VehicleTypeCreate {
  constructor(private vehicleTypeRepository: VehicleTypeRepository) {}

  async run(name: string, ratePerMinute: number): Promise<void> {
    const vehicleType = VehicleType.create(0, name, ratePerMinute);
    return this.vehicleTypeRepository.create(vehicleType);
  }
}
