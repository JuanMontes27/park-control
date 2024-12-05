import { VehicleType } from '../../vehicle-type/domain';

export interface VehicleTypeService {
  getVehicleTypeById(id: number): Promise<VehicleType | null>;
}
