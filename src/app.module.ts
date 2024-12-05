import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeEntity } from './context/vehicle-type/infrastructure/type-orm/VehicleTypeEntity';
import { VehicleTypeModule } from './context/vehicle-type/infrastructure/nest-js/vehicle-type.module';
import { VehicleEntity } from './context/vehicle/infrastructure/type-orm/VehicleEntity';
import { VehicleModule } from './context/vehicle/infrastructure/nest-js/vehicle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'park-control.sqlite',
      entities: [VehicleTypeEntity, VehicleEntity],
    }),
    VehicleTypeModule,
    VehicleModule,
  ],
})
export class AppModule {}
