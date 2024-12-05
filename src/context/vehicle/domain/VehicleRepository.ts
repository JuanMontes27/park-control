import { Vehicle } from './Vehicle';

export interface VehilceFilter {
  date?: string;
  hour?: string;
}

export interface VehicleRepository {
  create(vehicle: Vehicle): Promise<void>;
  getAll(): Promise<Vehicle[]>;
  filterBy(filters: VehilceFilter): Promise<Vehicle[]>;
  getById(id: number): Promise<Vehicle | null>;
  edit(vehicle: Vehicle): Promise<void>;
  remove(id: number): Promise<void>;
}
