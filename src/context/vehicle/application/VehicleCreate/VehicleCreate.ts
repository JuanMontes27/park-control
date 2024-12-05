import {
  Vehicle,
  VehicleError,
  VehicleRepository,
  VehicleTypeService,
} from '../../domain';

export class VehicleCreate {
  private readonly MILLISECONDS_PER_MINUTE = 60000;

  constructor(
    private vehicleRepository: VehicleRepository,
    private vehicleTypeService: VehicleTypeService,
  ) {}

  async run(licensePlate: string, typeId: number): Promise<void> {
    const vehicleType =
      await this.vehicleTypeService.getVehicleTypeById(typeId);

    if (!vehicleType)
      throw new VehicleError(`Vehicle Type with ID: ${typeId} does not exist`);

    const utcCurrentDate = new Date();

    const entryTime = new Date(
      utcCurrentDate.getTime() -
        utcCurrentDate.getTimezoneOffset() * this.MILLISECONDS_PER_MINUTE,
    );

    const vehicle = Vehicle.create({
      licensePlate,
      type: vehicleType,
      entryTime,
    });

    return this.vehicleRepository.create(vehicle);
  }
}
