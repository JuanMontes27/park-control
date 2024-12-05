import { VehicleType } from './VehicleType';

export interface VehicleTypeRepository {
  create(vehicleType: VehicleType): Promise<void>;
  getAll(): Promise<VehicleType[]>;
  getById(id: number): Promise<VehicleType | null>;
  remove(id: number): Promise<void>;
  edit(vehicleType: VehicleType): Promise<void>;
}
