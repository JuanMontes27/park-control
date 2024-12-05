import { VehicleError, VehicleRepository } from '../../domain';

export class VehicleChargeAmount {
  private readonly MILLISECONDS_PER_MINUTE = 60000;
  private readonly MILLISECONDS_PER_SECOND = 1000;
  private readonly SECONDS_PER_MINUTE = 60;

  constructor(private vehicleRepository: VehicleRepository) {}

  async run(id: number) {
    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle)
      throw new VehicleError(`Vehilce with ID: ${id} does not exist`);

    const hasChargeData =
      vehicle.exitTime !== undefined ||
      vehicle.totalTime !== undefined ||
      vehicle.amountCharged !== undefined;

    if (hasChargeData)
      throw new VehicleError('This vehicle has already been charged');

    const utcCurrentDate = new Date();

    const exitTime = new Date(
      utcCurrentDate.getTime() -
        utcCurrentDate.getTimezoneOffset() * this.MILLISECONDS_PER_MINUTE,
    );

    const dateDifferenceInMilliseconds =
      exitTime.valueOf() - vehicle.entryTime.valueOf();

    const dateDifferenceInMinutes = Math.round(
      dateDifferenceInMilliseconds /
        (this.MILLISECONDS_PER_SECOND * this.SECONDS_PER_MINUTE),
    );

    const amountCharged = dateDifferenceInMinutes * vehicle.type.ratePerMinute;

    vehicle.exitTime = exitTime;
    vehicle.totalTime = dateDifferenceInMinutes;
    vehicle.amountCharged = amountCharged;

    await this.vehicleRepository.edit(vehicle);

    return {
      amountCharged,
    };
  }
}
