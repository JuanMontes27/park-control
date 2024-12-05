import { Repository } from 'typeorm';
import { Vehicle, VehicleRepository, VehilceFilter } from '../../domain';
import { VehicleEntity } from './VehicleEntity';
import { VehicleTypeEntity } from '../../../vehicle-type/infrastructure/type-orm/VehicleTypeEntity';
import { VehicleType } from '../../../vehicle-type/domain';
import { InjectRepository } from '@nestjs/typeorm';

export class SqliteVehicleRepository implements VehicleRepository {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async create(vehicle: Vehicle): Promise<void> {
    const { licensePlate, type, entryTime } = vehicle;

    const vehicleType = new VehicleTypeEntity();
    vehicleType.id = type.id;
    vehicleType.name = type.name;
    vehicleType.ratePerMinute = type.ratePerMinute;

    await this.vehicleRepository.save({
      licensePlate,
      type: vehicleType,
      entryTime,
    });
  }

  async getAll(): Promise<Vehicle[]> {
    const vehicles = await this.vehicleRepository.find({
      relations: {
        type: true,
      },
    });

    return vehicles.map(function (vehicle) {
      const {
        id,
        licensePlate,
        type,
        entryTime,
        exitTime,
        totalTime,
        amountCharged,
      } = vehicle;

      const vehicleType = VehicleType.create(
        type.id,
        type.name,
        type.ratePerMinute,
      );

      return Vehicle.create({
        id,
        licensePlate,
        type: vehicleType,
        entryTime,
        exitTime: exitTime ?? undefined,
        totalTime: totalTime ?? undefined,
        amountCharged: amountCharged ?? undefined,
      });
    });
  }

  async filterBy(filters: VehilceFilter): Promise<Vehicle[]> {
    const vehicleQuery = this.vehicleRepository
      .createQueryBuilder('v')
      .select('v.id', 'vehicleId')
      .addSelect('license_plate', 'licensePlate')
      .addSelect('entry_time', 'entryTime')
      .addSelect('exit_time', 'exitTime')
      .addSelect('total_time', 'totalTime')
      .addSelect('amount_charged', 'amountCharged')
      .addSelect('type_id', 'typeId')
      .addSelect('name', 'typeName')
      .addSelect('rate_per_minute', 'ratePreMinute')
      .leftJoin(VehicleTypeEntity, 'vt', 'v.type_id=vt.id');

    if (filters?.date) {
      const { date } = filters;
      vehicleQuery.where("STRFTIME('%d-%m-%Y', entry_time) = :date", { date });
    }

    if (filters?.hour) {
      const { hour } = filters;
      vehicleQuery.andWhere("STRFTIME('%I:%M:%S %p', entry_time) >= :hour", {
        hour,
      });
    }

    const vehicles = await vehicleQuery.getRawMany();

    return vehicles.map((vehicle) => {
      const {
        vehicleId,
        licensePlate,
        entryTime,
        exitTime,
        totalTime,
        amountCharged,
        typeId,
        typeName,
        ratePerMinute,
      } = vehicle;

      const vehicleType = VehicleType.create(typeId, typeName, ratePerMinute);

      return Vehicle.create({
        id: vehicleId,
        licensePlate,
        type: vehicleType,
        entryTime,
        exitTime,
        totalTime,
        amountCharged,
      });
    });
  }

  async getById(id: number): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id,
      },
      relations: {
        type: true,
      },
    });

    if (!vehicle) return null;

    const { type, entryTime, exitTime, totalTime, amountCharged } = vehicle;

    const vehicleType = VehicleType.create(
      type.id,
      type.name,
      type.ratePerMinute,
    );

    return Vehicle.create({
      id,
      licensePlate: vehicle.licensePlate,
      type: vehicleType,
      entryTime,
      exitTime: exitTime ?? undefined,
      totalTime: totalTime ?? undefined,
      amountCharged: amountCharged ?? undefined,
    });
  }

  async remove(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }

  async edit(vehicle: Vehicle): Promise<void> {
    const {
      id,
      licensePlate,
      type,
      entryTime,
      exitTime,
      totalTime,
      amountCharged,
    } = vehicle;

    const vehicleType = new VehicleTypeEntity();

    vehicleType.id = type.id;

    await this.vehicleRepository.update(id, {
      licensePlate,
      type: vehicleType,
      entryTime,
      exitTime,
      totalTime,
      amountCharged,
    });
  }
}
