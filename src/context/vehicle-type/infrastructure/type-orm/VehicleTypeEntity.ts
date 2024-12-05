import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicle_type')
export class VehicleTypeEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'rate_per_minute', type: 'decimal', nullable: false })
  ratePerMinute: number;
}
