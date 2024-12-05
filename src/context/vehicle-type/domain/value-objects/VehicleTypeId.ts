import { VehicleTypeError } from '../VehicleTypeError';

export class VehicleTypeId {
  constructor(public value: number) {
    this.ensureIsValid();
  }

  private ensureIsValid(): void {
    if (this.value < 0)
      throw new VehicleTypeError('The vehicle type ID can not be negative');
  }
}
