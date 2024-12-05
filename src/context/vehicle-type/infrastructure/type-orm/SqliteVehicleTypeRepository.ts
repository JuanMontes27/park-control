import { Repository } from 'typeorm';
import { VehicleType, VehicleTypeRepository } from '../../domain';
import { VehicleTypeEntity } from './VehicleTypeEntity';
import { InjectRepository } from '@nestjs/typeorm';

export class SqliteVehicleTypeRepository implements VehicleTypeRepository {
  constructor(
    @InjectRepository(VehicleTypeEntity)
    private readonly vehicleTypeRepository: Repository<VehicleTypeEntity>,
  ) {}

  async create(vehicleType: VehicleType): Promise<void> {
    const { name, ratePerMinute } = vehicleType;

    await this.vehicleTypeRepository.save({
      name,
      ratePerMinute,
    });
  }

  async getAll(): Promise<VehicleType[]> {
    const vehicleTypes = await this.vehicleTypeRepository.find();

    return vehicleTypes.map((vehicleType) =>
      VehicleType.create(
        vehicleType.id,
        vehicleType.name,
        vehicleType.ratePerMinute,
      ),
    );
  }

  async getById(id: number): Promise<VehicleType | null> {
    const vehicleType = await this.vehicleTypeRepository.findOne({
      where: {
        id,
      },
    });

    if (!vehicleType) return null;

    return VehicleType.create(
      vehicleType.id,
      vehicleType.name,
      vehicleType.ratePerMinute,
    );
  }

  async remove(id: number): Promise<void> {
    await this.vehicleTypeRepository.delete(id);
  }

  async edit(vehicleType: VehicleType): Promise<void> {
    const { id, name, ratePerMinute } = vehicleType;

    await this.vehicleTypeRepository.update(id, {
      name,
      ratePerMinute,
    });
  }
}
