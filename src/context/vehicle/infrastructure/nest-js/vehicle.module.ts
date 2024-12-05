import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from '../type-orm/VehicleEntity';
import { SqliteVehicleRepository } from '../type-orm/SqliteVehicleRepository';
import {
  VehicleChargeAmount,
  VehicleCreate,
  VehicleEdit,
  VehicleGetAll,
  VehicleGetById,
  VehicleRemove,
  VehicleTypeServiceImpl,
} from '../../application';
import { VehicleTypeModule } from 'src/context/vehicle-type/infrastructure/nest-js/vehicle-type.module';
import { VehicleFilter } from '../../application/VehicleFilter/VehicleFilter';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity]), VehicleTypeModule],
  controllers: [VehicleController],
  providers: [
    {
      provide: 'VehicleRepository',
      useClass: SqliteVehicleRepository,
    },
    {
      provide: 'VehicleGetAll',
      useFactory: (repository: SqliteVehicleRepository) =>
        new VehicleGetAll(repository),
      inject: ['VehicleRepository'],
    },
    {
      provide: 'VehicleGetById',
      useFactory: (repository: SqliteVehicleRepository) =>
        new VehicleGetById(repository),
      inject: ['VehicleRepository'],
    },
    {
      provide: 'VehicleCreate',
      useFactory: (
        repository: SqliteVehicleRepository,
        vehicleTypeService: VehicleTypeServiceImpl,
      ) => new VehicleCreate(repository, vehicleTypeService),
      inject: ['VehicleRepository', 'VehicleTypeService'],
    },
    {
      provide: 'VehicleEdit',
      useFactory: (
        repository: SqliteVehicleRepository,
        vehicleTypeService: VehicleTypeServiceImpl,
      ) => new VehicleEdit(repository, vehicleTypeService),
      inject: ['VehicleRepository', 'VehicleTypeService'],
    },
    {
      provide: 'VehicleRemove',
      useFactory: (repository: SqliteVehicleRepository) =>
        new VehicleRemove(repository),
      inject: ['VehicleRepository'],
    },
    {
      provide: 'VehicleChargeAmount',
      useFactory: (repository: SqliteVehicleRepository) =>
        new VehicleChargeAmount(repository),
      inject: ['VehicleRepository'],
    },
    {
      provide: 'VehicleFilter',
      useFactory: (repository: SqliteVehicleRepository) =>
        new VehicleFilter(repository),
      inject: ['VehicleRepository'],
    },
  ],
})
export class VehicleModule {}
