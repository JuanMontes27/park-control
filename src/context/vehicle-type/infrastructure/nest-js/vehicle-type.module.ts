import { Module } from '@nestjs/common';
import { VehicleTypeController } from './vehicle-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeEntity } from '../type-orm/VehicleTypeEntity';
import { SqliteVehicleTypeRepository } from '../type-orm/SqliteVehicleTypeRepository';
import {
  VehicleTypeCreate,
  VehicleTypeEdit,
  VehicleTypeGetAll,
  VehicleTypeGetById,
  VehicleTypeRemove,
} from '../../application';
import { VehicleTypeServiceImpl } from 'src/context/vehicle/application';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleTypeEntity])],
  controllers: [VehicleTypeController],
  providers: [
    {
      provide: 'VehicleTypeRepository',
      useClass: SqliteVehicleTypeRepository,
    },
    {
      provide: 'VehicleTypeGetAll',
      useFactory: (repository: SqliteVehicleTypeRepository) =>
        new VehicleTypeGetAll(repository),
      inject: ['VehicleTypeRepository'],
    },
    {
      provide: 'VehicleTypeGetById',
      useFactory: (repository: SqliteVehicleTypeRepository) =>
        new VehicleTypeGetById(repository),
      inject: ['VehicleTypeRepository'],
    },
    {
      provide: 'VehicleTypeCreate',
      useFactory: (repository: SqliteVehicleTypeRepository) =>
        new VehicleTypeCreate(repository),
      inject: ['VehicleTypeRepository'],
    },
    {
      provide: 'VehicleTypeEdit',
      useFactory: (repository: SqliteVehicleTypeRepository) =>
        new VehicleTypeEdit(repository),
      inject: ['VehicleTypeRepository'],
    },
    {
      provide: 'VehicleTypeRemove',
      useFactory: (repository: SqliteVehicleTypeRepository) =>
        new VehicleTypeRemove(repository),
      inject: ['VehicleTypeRepository'],
    },
    {
      provide: 'VehicleTypeService',
      useFactory: (repository: SqliteVehicleTypeRepository) =>
        new VehicleTypeServiceImpl(repository),
      inject: ['VehicleTypeRepository'],
    },
  ],
  exports: ['VehicleTypeService'],
})
export class VehicleTypeModule {}
