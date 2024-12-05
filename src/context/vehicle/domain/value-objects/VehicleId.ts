import { VehicleError } from '../VehicleError';

export class VehicleId {
  constructor(public value: number) {
    this.ensureIsValid();
  }

  private ensureIsValid(): void {
    if (this.value < 0)
      throw new VehicleError('The vehicle type ID can not be negative');
  }
}
