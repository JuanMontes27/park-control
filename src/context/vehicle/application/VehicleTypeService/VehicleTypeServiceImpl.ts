import {
  VehicleType,
  VehicleTypeRepository,
} from 'src/context/vehicle-type/domain';
import { VehicleTypeService } from '../../domain';

export class VehicleTypeServiceImpl implements VehicleTypeService {
  constructor(private vehicleTypeRepository: VehicleTypeRepository) {}

  async getVehicleTypeById(id: number): Promise<VehicleType | null> {
    return this.vehicleTypeRepository.getById(id);
  }
}
