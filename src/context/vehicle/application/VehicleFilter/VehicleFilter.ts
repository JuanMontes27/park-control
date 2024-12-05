import { VehicleError, VehicleRepository } from '../../domain';
import { VehicleFilterDto } from './dto/VehicleFilterDto';
import { VehicleFilterResultDto } from './dto/VehicleFilterResultDto';

export class VehicleFilter {
  constructor(private vehicleRepository: VehicleRepository) {}

  async run(filter: VehicleFilterDto): Promise<VehicleFilterResultDto[]> {
    const isFilterWithHour = !(filter.hour !== undefined);

    if (isFilterWithHour && filter.date == undefined)
      throw new VehicleError(
        'If you want this filter by hour you need select day',
      );

    const vehicles = await this.vehicleRepository.filterBy(filter);

    return vehicles.map((vehicle) => {
      const { licensePlate, totalTime, type, amountCharged } = vehicle;
      const { name } = type;

      return {
        licensePlate,
        totalTime,
        type: name,
        amountCharged,
      };
    });
  }
}
