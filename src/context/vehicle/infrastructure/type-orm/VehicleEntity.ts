import { VehicleTypeEntity } from '../../../vehicle-type/infrastructure/type-orm/VehicleTypeEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vehicle')
export class VehicleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @ManyToOne(() => VehicleTypeEntity, { nullable: false })
  @JoinColumn({ name: 'type_id' })
  type: VehicleTypeEntity;

  @Column({ name: 'entry_time', type: 'datetime' })
  entryTime: Date;

  @Column({ name: 'exit_time', type: 'datetime', nullable: true })
  exitTime: Date;

  @Column({ name: 'total_time', type: 'int', nullable: true })
  totalTime: number;

  @Column({ name: 'amount_charged', type: 'int', nullable: true })
  amountCharged: number;
}
